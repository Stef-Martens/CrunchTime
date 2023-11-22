import "react-native-gesture-handler";

// Import React and Component
import React from "react";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import SplashScreen from "./Screens/Auth/SplashScreen";

// Import Navigation
import NavigationMain from "./Navigation/NavigationMain";
import NavigationAuth from "./Navigation/NavigationAuth";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="NavigationAuth"
          component={NavigationAuth}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="NavigationMain"
          component={NavigationMain}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
