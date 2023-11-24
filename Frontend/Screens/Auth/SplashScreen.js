import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthStyle from "../../styles/AuthStyle";
import { getUserInformation, renewToken } from "../../api";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  const renewTokenFunction = async () => {
    return await renewToken(
      await AsyncStorage.getItem("user_id"),
      await AsyncStorage.getItem("refresh_token")
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);

      const checkTokens = async () => {
        const user_id = await AsyncStorage.getItem("user_id");
        const access_token = await AsyncStorage.getItem("access_token");
        const refresh_token = await AsyncStorage.getItem("refresh_token");

        if (user_id != null) {
          try {
            const hasValidAccessToken = await getUserInformation(
              user_id,
              access_token
            );
            if (hasValidAccessToken) {
              console.log("een");
              navigation.replace("NavigationMain");
            } else {
              console.log("twee");
              const newToken = await renewToken(user_id, refresh_token);

              await AsyncStorage.setItem("access_token", newToken);
              navigation.replace("NavigationMain");
            }
          } catch (error) {
            /* await AsyncStorage.clear();
            navigation.replace("NavigationAuth");*/
          }
        } else {
          await AsyncStorage.clear();
          navigation.replace("NavigationAuth");
        }
      };

      checkTokens();
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
