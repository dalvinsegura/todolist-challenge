import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
} from "react-native";
import React from "react";
import Colors from "../theme/colors";
import { ScaledSheet } from "react-native-size-matters";

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  ...props
}: {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
} & TextInputProps) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholderTextColor="#ccc"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = ScaledSheet.create({
  input: {
    paddingVertical: "15@vs",
    paddingHorizontal: "15@s",
    borderRadius: 10,
    backgroundColor: Colors.secondaryBackground,
    fontSize: "14@s",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.primary,
  },
});
