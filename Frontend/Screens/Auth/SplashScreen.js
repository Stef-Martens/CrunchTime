import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthStyle from "../../styles/AuthStyle";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem("user_id").then((value) =>
        navigation.replace(value === null ? "NavigationAuth" : "NavigationMain")
      );
    }, 3000);
  }, []);

  return (
    <View style={AuthStyle.container}>
      <Text>{"\n\n\n"}</Text>
      <ActivityIndicator animating={animating} size="large" />
    </View>
  );
};

export default SplashScreen;
