import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import Colors from "@core/theme/colors";
import { ScaledSheet } from "react-native-size-matters";
import { Todo } from "../models/Todo";

const TodoItem = ({
  todo: { id, title, completed },
  onToggle,
  onPress,
}: {
  todo: Todo;
  onToggle: (value: boolean) => void;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      id={id.toString()}
      style={styles.container}
      onPress={onPress}
    >
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
        {title}
      </Text>
      <Checkbox
        value={completed}
        style={styles.checkbox}
        onValueChange={onToggle}
      />
    </TouchableOpacity>
  );
};

export default TodoItem;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    padding: "17@vs",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10@vs",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.primary,
  },
  title: {
    width: "80%",
    fontSize: "16@s",
    color: Colors.text,
  },
  checkbox: {
    width: "24@s",
    height: "24@s",
    borderRadius: 4,
    borderColor: Colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
