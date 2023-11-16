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
import React, { useState, createRef } from "react";

import { images, COLORS, FONT, SIZES } from "../../constants/index";

import AsyncStorage from "@react-native-async-storage/async-storage";
import OverallStyle from "../../styles/OverallStyle";
import AuthStyle from "../../styles/AuthStyle";

export default function LoginScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext("");
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    /*let dataToSend = { email: userEmail, password: userPassword };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: formBody,
      headers: {
        //Header Defination
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === "success") {
          AsyncStorage.setItem("user_id", responseJson.data.email);
          console.log(responseJson.data.email);
          navigation.replace("NavigationMain");
        } else {
          setErrortext(responseJson.msg);
          console.log("Please check your email id or password");
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });*/
  };

  return (
    <View>
      <View style={OverallStyle.container}>
        <KeyboardAvoidingView enabled>
          <Image source={images.appa} style={AuthStyle.logo}></Image>
          <TextInput
            placeholder="Enter Email" //dummy@abc.com
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
            style={AuthStyle.inputfield}
          />

          <TextInput
            onChangeText={(UserPassword) => setUserPassword(UserPassword)}
            placeholder="Enter Password" //12345
            placeholderTextColor="#8b9cb5"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            underlineColorAndroid="#f000"
            returnKeyType="next"
            style={AuthStyle.inputfield}
          />

          {errortext != "" ? <Text>{errortext}</Text> : null}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleSubmitPress}
            style={AuthStyle.button}
          >
            <Text style={AuthStyle.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("RegisterScreen")}
            style={[AuthStyle.button, { backgroundColor: "#808080" }]}
          >
            <Text style={AuthStyle.buttonText}>New Here ? Register</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
