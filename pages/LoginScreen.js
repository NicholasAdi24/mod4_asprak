import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Fetch user data from ReqRes API
      const response = await axios.get("https://reqres.in/api/users");
      const users = response.data.data;

      // Find the user by email
      const user = users.find((user) => user.email === email);

      if (user && user.first_name === password) {
        // If the user is found and the password matches, navigate to HomeScreen
        Alert.alert("Login Success!", `Welcome, ${user.first_name}!`);
        navigation.navigate("Home");
      } else {
        // If login fails, show an alert
        Alert.alert("Login Failed!", "Invalid email or password.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while logging in.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email (ex. george.bluth@reqres.in)"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="First Name (Password) (ex. George)"
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoginScreen;
