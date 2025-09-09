import { Text, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "@core/theme/colors";

const CustomListEmptyTodo = () => {
  return (
    <View>
      <Text style={styles.emptyText}>No hay tareas. ¡Crea una!</Text>
    </View>
  );
};

export default CustomListEmptyTodo;

const styles = ScaledSheet.create({
  emptyText: {
    color: Colors.text,
    alignSelf: "center",
    marginTop: "10@vs",
  },
});
