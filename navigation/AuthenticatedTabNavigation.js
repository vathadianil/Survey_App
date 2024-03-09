import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Colors } from "../constants/styles";
import LocationSearchScreen from "../screens/LocationSearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const AuthenticatedTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        // unmountOnBlur: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 50,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? Colors.primary800 : Colors.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LocationSearch"
        component={LocationSearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={"search-sharp"}
              size={24}
              color={focused ? Colors.primary800 : Colors.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? Colors.primary800 : Colors.gray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthenticatedTabNavigation;

const styles = StyleSheet.create({});
