import {
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
} from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@core/navigation/RootStack";
import Colors from "@core/theme/colors";
import { ScaledSheet } from "react-native-size-matters";
import useHomeViewModel from "../../Home/viewModel/homeViewModel";
import { Todo } from "../../Home/models/Todo";
import TodoDetailedButton from "../components/TodoDetailedButton";

const TodoDetailedScreen = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList, "TodoDetail">;
}) => {
  const todo: Todo = navigation
    .getState()
    .routes.find((route) => route.name === "TodoDetail")?.params?.todo || {
    id: 0,
    title: "",
    content: "",
    completed: false,
  };

  const [title, setTitle] = React.useState(todo?.title);
  const [content, setContent] = React.useState(todo?.content);
  const vm = useHomeViewModel();

  // Update title with a delay of 2 seconds after the user stops typing
  const handleTitleChange = (text: string) => {
    setTitle(text);
    setTimeout(() => {
      vm.updateTodo({
        id: todo.id,
        title: text,
        content: content,
        completed: todo.completed,
      });
    }, 6000);
  };

  // Update content with a delay of 2 seconds after the user stops typing
  const handleContentChange = (text: string) => {
    setContent(text);
    setTimeout(() => {
      vm.updateTodo({
        id: todo.id,
        title: title,
        content: text,
        completed: todo.completed,
      });
    }, 6000);
  };

  return (
    <ImageBackground
      source={require("@assets/background-home.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TodoDetailedButton
            onPress={() => navigation.goBack()}
            iconName="back"
            style={styles.goBackButton}
            iconColor="white"
            iconSize={24}
          />

          <TodoDetailedButton
            onPress={() => {
              vm.deleteTodo(todo.id);
              navigation.goBack();
            }}
            iconName="delete"
            style={styles.deleteButon}
            iconColor="white"
            iconSize={24}
          />
        </View>
        <TextInput
          placeholder="Título de la tarea"
          placeholderTextColor={Colors.text}
          style={styles.title}
          value={title}
          onChangeText={handleTitleChange}
        />
        <TextInput
          placeholder="Escribe los detalles de tu tarea aquí..."
          placeholderTextColor={Colors.text}
          multiline
          style={styles.content}
          value={content}
          onChangeText={handleContentChange}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default TodoDetailedScreen;

const styles = ScaledSheet.create({
  goBackButton: {
    backgroundColor: Colors.primary,
    padding: "10@ms",
    borderRadius: "10@ms",
  },
  deleteButon: {
    backgroundColor: Colors.delete,
    padding: "10@ms",
    borderRadius: "10@ms",
  },
  title: {
    color: Colors.text,
    fontSize: "24@s",
    fontWeight: "bold",
    marginHorizontal: "20@s",
    marginTop: "10@vs",
  },
  content: {
    backgroundColor: Colors.secondaryBackground,
    color: Colors.text,
    fontSize: "13@s",
    marginHorizontal: "20@s",
    marginTop: "30@vs",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.primary,
    borderRadius: 10,
    height: "300@vs",
    textAlignVertical: "top",
    alignItems: "flex-start",
    padding: "10@s",

    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 13,
    elevation: 5,
  },
});
