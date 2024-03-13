import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Colors } from "../constants/styles";
import LocationSearchScreen from "../screens/LocationSearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = (props) => {
  const { children, onPress, accessibilityState } = props;

  return (
    <Pressable
      android_ripple={{ color: Colors.shadowColor }}
      style={({ pressed }) => pressed && styles.pressedBtn}
      onPress={onPress}
    >
      <View
        style={[
          styles.customTabInnerContainer,
          styles.shadow,
          {
            backgroundColor: accessibilityState.selected
              ? Colors.black
              : Colors.primary800,
          },
        ]}
      >
        {children}
      </View>
    </Pressable>
  );
};

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
          bottom: 10,
          right: 20,
          left: 20,
          elevation: 0,
          height: 70,
          borderRadius: 15,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? Colors.primary800 : Colors.gray}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "semibold",
                  color: focused ? Colors.primary800 : Colors.gray,
                }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="LocationSearch"
        component={LocationSearchScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name={"location-outline"}
              size={30}
              color={Colors.white}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? Colors.primary800 : Colors.gray}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "semibold",
                  color: focused ? Colors.primary800 : Colors.gray,
                }}
              >
                PROFILE
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthenticatedTabNavigation;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 4,
  },
  customTabInnerContainer: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  pressedBtn: {
    opacity: 0.25,
  },
});
