import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import React from "react";
import Colors from "@core/theme/colors";
import CustomTextInput from "@core/components/CustomTextInput";
import CustomButton from "@core/components/CustomButton";
import { ScaledSheet } from "react-native-size-matters";
import TodoItem from "../components/TodoItem";
import useHomeViewModel from "../viewModel/homeViewModel";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Todo } from "../models/Todo";
import { RootStackParamList } from "@core/navigation/RootStack";
import CreateTodoModal from "../components/CreateTodoModal";
import CustomListEmptyTodo from "../components/CustomListEmptyTodo";

const HomeScreen = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Home">>();

  const vm = useHomeViewModel();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [title, setTitle] = React.useState("");

  // Toggle create todo modal: open or close
  const handleToggleModal = () => setModalVisible(!modalVisible);

  const handleCreate = () => {
    vm.createTodo(
      {
        title: title,
        content: "",
        completed: false,
      } as Todo,
      {
        onSuccess: () => {
          setTitle("");
          setModalVisible(false);
        },
      }
    );
  };

  // Toggle todo item: completed or not
  const handleOnToggleTodoItem = (value: boolean, item: Todo) => {
    vm.updateTodo({
      id: item.id,
      title: item.title,
      content: item.content,
      completed: value,
    });
  };

  // Navigate to TodoDetail screen with the selected todo item
  const handlePressTodo = (todo: Todo) =>
    navigation.navigate("TodoDetail", { todo: todo });

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("@assets/background-home.png")}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <Image
            style={styles.profilePic}
            source={require("@assets/icon.png")}
          />
          <Text style={styles.title}>¿Qué tienes para hoy?</Text>
          <View style={{ marginTop: 20 }}>
            <CustomTextInput
              placeholder="Buscar tareas"
              value=""
              onChangeText={(text) => console.log(text)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <CustomButton onPress={handleToggleModal} labelText="Nueva" />
          </View>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>
            Todas tus tarea ({vm.todos.length})
          </Text>
          <FlatList
            data={vm.todos}
            showsVerticalScrollIndicator={false}
            style={{ height: "75%" }}
            ListEmptyComponent={<CustomListEmptyTodo />}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onPress={() => handlePressTodo(item)}
                onToggle={(value) => handleOnToggleTodoItem(value, item)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <CreateTodoModal
            visible={modalVisible}
            onToggle={handleToggleModal}
            onCreate={handleCreate}
            title={title}
            onChangeText={setTitle}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  backgroundImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    paddingHorizontal: "10@s",
  },
  profilePic: {
    width: "50@s",
    height: "50@s",
    borderRadius: 100,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  title: {
    fontSize: "24@s",
    color: Colors.text,
    marginTop: "15@vs",
  },
  listContainer: {
    marginTop: "40@vs",
    backgroundColor: Colors.secondaryBackground,
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: "20@s",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 13,
    elevation: 5,
  },
  listTitle: {
    fontSize: "14@s",
    color: Colors.text,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: "20@vs",
  },
});
