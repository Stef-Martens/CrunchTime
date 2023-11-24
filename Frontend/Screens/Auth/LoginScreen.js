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
import React, { useState, createRef, useEffect } from "react";

import { images, COLORS, FONT, SIZES } from "../../constants/index";

import AsyncStorage from "@react-native-async-storage/async-storage";
import OverallStyle from "../../styles/OverallStyle";
import AuthStyle from "../../styles/AuthStyle";

import { loginUser } from "../../api";

export default function LoginScreen({ navigation }) {
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

  const [errortext, setErrortext] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // error handling
    if (!email || !password) {
      setErrortext("Please fill in your email");
      return;
    }

    if (!checkifemailisvalid(email) || !checkifpasswordisvalid(password)) {
      return;
    }

    // log user in
    try {
      setErrortext("");
      const result = await loginUser(email, password);
      if (result) {
        await AsyncStorage.setItem("access_token", result.accessToken);
        await AsyncStorage.setItem("refresh_token", result.refreshToken);
        await AsyncStorage.setItem("user_id", result.user_id.toString());

        navigation.replace("NavigationMain");
      } else {
        setErrortext("Something went wrong");
      }
    } catch (error) {
      setErrortext("Invalid email or password");
      return;
    }
  };

  return (
    <View style={AuthStyle.container}>
      <KeyboardAvoidingView enabled>
        <Image source={images.appa} style={AuthStyle.logo}></Image>
        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          underlineColorAndroid="#f000"
          value={email}
          onChangeText={(text) => setEmail(text)}
          blurOnSubmit={false}
          style={AuthStyle.inputfield}
        />

        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#8b9cb5"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          secureTextEntry={true}
          underlineColorAndroid="#f000"
          returnKeyType="next"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={AuthStyle.inputfield}
        />

        {errortext ? <Text>{errortext}</Text> : null}

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleLogin}
          style={AuthStyle.buttonBig}
        >
          <Text style={AuthStyle.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("RegisterScreen")}
          style={[AuthStyle.buttonBig, { backgroundColor: "#808080" }]}
        >
          <Text style={AuthStyle.buttonText}>New Here ? Register</Text>
        </TouchableOpacity>

        <View style={AuthStyle.socialButtons}>
          <TouchableOpacity activeOpacity={0.5} style={AuthStyle.buttonSmall}>
            <Text style={AuthStyle.buttonText}>GOOGLE</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} style={AuthStyle.buttonSmall}>
            <Text style={AuthStyle.buttonText}>NOG IET</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
