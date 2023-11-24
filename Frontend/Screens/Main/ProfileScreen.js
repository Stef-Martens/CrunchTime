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

import AsyncStorage from "@react-native-async-storage/async-storage";
import OverallStyle from "../../styles/OverallStyle";
import AuthStyle from "../../styles/AuthStyle";

import { logoutUser } from "../../api";

export default function ProfileScreen({ navigation }) {
  const handleLogout = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    const token = await AsyncStorage.getItem("refresh_token");

    const result = await logoutUser(user_id, token);
    if (result) {
      AsyncStorage.clear();
      navigation.replace("NavigationAuth");
    }
  };

  return (
    <View>
      <Text>{"\n\n\n"}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleLogout}
        style={AuthStyle.buttonBig}
      >
        <Text style={AuthStyle.buttonText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}
