import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "../Screens/Main/HomeScreen";
import NewHabitScreen from "../Screens/Main/NewHabitScreen";
import ProfileScreen from "../Screens/Main/ProfileScreen";
import WelcomeScreen from "../Screens/Main/WelcomeScreen";

//Screen names
const homeName = "Home";
const welcomeScreen = "WelcomeScreen";
const newHabitScreen = "NewHabitScreen";
const profileScreen = "Settings";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function NavigationMain() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === newHabitScreen) {
            iconName = focused ? "list" : "list-outline";
          } else if (rn === profileScreen) {
            iconName = focused ? "settings" : "settings-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={welcomeScreen} component={WelcomeScreen} />
      <Tab.Screen name={newHabitScreen} component={NewHabitScreen} />
      <Tab.Screen name={profileScreen} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default NavigationMain;
