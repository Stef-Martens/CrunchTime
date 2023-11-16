import * as React from "react";
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

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  return (
    <View>
      <View style={([OverallStyle.container], { marginTop: 50 })}>
        <KeyboardAvoidingView enabled>
          <TextInput
            placeholder="Enter First Name"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
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
            style={AuthStyle.inputfield}
          />

          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
            style={AuthStyle.inputfield}
          />

          <TextInput
            placeholder="Enter Password" //12345
            placeholderTextColor="#8b9cb5"
            keyboardType="default"
            blurOnSubmit={false}
            secureTextEntry={true}
            underlineColorAndroid="#f000"
            returnKeyType="next"
            style={AuthStyle.inputfield}
          />

          <TouchableOpacity activeOpacity={0.5} style={AuthStyle.button}>
            <Text style={AuthStyle.buttonText}>REGISTER</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("LoginScreen")}
            style={[AuthStyle.button, { backgroundColor: "#808080" }]}
          >
            <Text style={AuthStyle.buttonText}>BACK TO SCHOOL</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
