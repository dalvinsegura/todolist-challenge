import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import Colors from "@core/theme/colors";

const CreateTodoModal = ({
  visible,
  onToggle,
  onCreate,
  title,
  onChangeText,
}: {
  visible: boolean;
  onCreate: () => void;
  onToggle: () => void;
  onChangeText: (text: string) => void;
  title: string;
}) => {
  return (
    <Modal
      backdropColor={"rgba(0, 0, 0, 0.75)"}
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
      }}
      visible={visible}
      animationType="fade"
    >
      <KeyboardAvoidingView style={styles.modal}>
        <Text style={styles.title}>Crear una nueva tarea</Text>
        <TextInput
          value={title}
          placeholderTextColor={Colors.text}
          numberOfLines={2}
          placeholder="Título de la tarea"
          style={styles.input}
          onSubmitEditing={onCreate}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={onCreate} style={styles.createButton}>
          <Text style={styles.createButtonText}>Crear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onToggle} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateTodoModal;

const styles = ScaledSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
    padding: "16@ms",
    backgroundColor: Colors.secondaryBackground,
    position: "absolute",
    top: "30%",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: "18@s",
    color: Colors.text,
    marginBottom: "20@vs",
  },
  input: {
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: "10@vs",
    paddingHorizontal: "10@s",
    marginBottom: "20@vs",
    color: Colors.text,
  },
  createButton: {
    backgroundColor: Colors.primary,
    paddingVertical: "10@vs",
    paddingHorizontal: "20@s",
    borderRadius: 10,
    marginBottom: "10@vs",
    width: "100%",
    alignItems: "center",
  },
  createButtonText: {
    color: Colors.text,
    fontSize: "14@s",
    fontWeight: "bold",
  },
  closeButton: {
    paddingVertical: "10@vs",
    paddingHorizontal: "20@s",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.delete,
  },
  closeButtonText: {
    color: Colors.delete,
    fontSize: "14@s",
    fontWeight: "bold",
  },
});
