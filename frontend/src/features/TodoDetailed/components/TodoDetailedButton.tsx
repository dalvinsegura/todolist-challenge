import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const TodoDetailedButton = ({
  onPress,
  iconName,
  iconColor = "white",
  iconSize = 24,
  ...props
}: {
  onPress: () => void;
  iconName?: keyof typeof AntDesign.glyphMap;
  iconColor?: string;
  iconSize?: number;
} & TouchableOpacityProps) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      {iconName && (
        <AntDesign name={iconName} size={iconSize} color={iconColor} />
      )}
    </TouchableOpacity>
  );
};

export default TodoDetailedButton;
