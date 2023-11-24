import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from "react-native";

import { images, COLORS, FONT, SIZES } from "../../constants/index";

import AuthStyle from "../../styles/AuthStyle";
import OverallStyle from "../../styles/OverallStyle";

import { registerUser } from "../../api";
import { checkifpasswordisvalid, checkifemailisvalid } from "./LoginScreen";

export default function RegisterScreen({ navigation }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errortext, setErrortext] = useState("");

  function checkifpasswordisvalid(password) {
    if (password.length < 6 || !/\W/.test(password)) {
      setErrortext(
        "Password must be at least 6 characters long and contain at least one special character."
      );
      return false;
    }
    return true;
  }

  function checkifemailisvalid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrortext("Please enter a valid email address.");
      return false;
    }
    return true;
  }

  const handleRegister = async () => {
    // error handling
    if (!first_name || !last_name || !email || !password) {
      setErrortext("Please fill in all fields");
      return;
    }

    if (first_name.length > 40 || last_name.length > 40) {
      setErrortext("Give valid name");
      return;
    }

    if (!checkifemailisvalid(email) || !checkifpasswordisvalid(password)) {
      return;
    }

    try {
      const result = await registerUser(first_name, last_name, email, password);
      if (result.status == 201) {
        navigation.navigate("LoginScreen");
      }
      if (result.status == 409) {
        setErrortext("User with this email already exists");
      }
    } catch (err) {
      setErrortext("Something went wrong");
    }
  };

  return (
    <View style={AuthStyle.container}>
      <KeyboardAvoidingView enabled>
        <TextInput
          placeholder="Enter First Name"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="next"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          onChangeText={(text) => setFirstName(text)}
          style={AuthStyle.inputfield}
        />

        <TextInput
          placeholder="Enter Last Name"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="next"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          onChangeText={(text) => setLastName(text)}
          style={AuthStyle.inputfield}
        />

        <TextInput
          placeholder="Enter Email" //dummy@abc.com
          placeholderTextColor="#8b9cb5"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          onChangeText={(text) => setEmail(text)}
          style={AuthStyle.inputfield}
        />

        <TextInput
          placeholder="Enter Password" //12345
          placeholderTextColor="#8b9cb5"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          secureTextEntry={true}
          underlineColorAndroid="#f000"
          returnKeyType="next"
          onChangeText={(text) => setPassword(text)}
          style={AuthStyle.inputfield}
        />

        {errortext ? <Text>{errortext}</Text> : null}

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleRegister}
          style={[AuthStyle.buttonBig, { backgroundColor: "#808080" }]}
        >
          <Text style={AuthStyle.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("LoginScreen")}
          style={[AuthStyle.buttonBig, { backgroundColor: "#808080" }]}
        >
          <Text style={AuthStyle.buttonText}>BACK TO LOGIN</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
