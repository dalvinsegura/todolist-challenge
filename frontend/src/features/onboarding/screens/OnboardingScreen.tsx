import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@core/theme/colors";
import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("Home" as never);
  };
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("@assets/background-onboarding.png")}
    >
      <View style={{ width: "100%", padding: 20 }}>
        <Text style={{ fontSize: 40 }}>👋</Text>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Gestion tus tareas e ideas.</Text>
        <TouchableOpacity style={styles.btnContainer} onPress={handleNavigate}>
          <Text style={styles.btnText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default OnboardingScreen;

const styles = ScaledSheet.create({
  backgroundImage: {
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: "24@s",
    color: Colors.text,
    fontWeight: "bold",
    marginTop: "10@vs",
  },
  subtitle: {
    fontSize: "20@s",
    fontWeight: "200",
    color: Colors.text,
    marginBottom: "20@vs",
  },
  btnContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: "10@vs",
    borderRadius: "10@vs",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: "16@s",
    color: Colors.text,
  },
});
