import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import React from "react";
import Colors from "../theme/colors";

const CustomButton = ({
  labelText,
  ...props
}: TouchableOpacityProps & { labelText: string }) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{labelText}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = ScaledSheet.create({
  button: {
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: "12@vs",
    paddingHorizontal: "25@s",
  },
  buttonText: {
    color: "#fff",
    fontSize: "16@s",
  },
});
