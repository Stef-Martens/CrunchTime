/*import React, { useState, useEffect } from "react";
import NavigationMain from "./Navigation/NavigationMain";
import NavigationAuth from "./Navigation/NavigationAuth";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status (e.g., from AsyncStorage, Redux state, etc.)
    const checkAuthentication = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsAuthenticated(false); // Set to true for demo purposes
      } catch (error) {
        console.error("Authentication check error:", error);
      }
    };

    checkAuthentication();
  }, []);

  return isAuthenticated ? <NavigationMain /> : <NavigationAuth />;
};

export default App;*/

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
