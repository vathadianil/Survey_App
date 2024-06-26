import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Colors } from "../constants/styles";
import ProfileScreen from "../screens/ProfileScreen";
import { DISTRICT } from "../constants/location-names";
import DistrictLocationSearchScreen from "../screens/LocationSearch/DistrictLocationSearchScreen";

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
          ...styles.customTabBarStyles,
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
        name="DistrictLocationSearch"
        initialParams={{ locationKey: DISTRICT }}
        component={DistrictLocationSearchScreen}
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
                name={focused ? "man" : "man-outline"}
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
    shadowOpacity: 0.2,
    shadowRadius: 20,
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
  customTabBarStyles: {
    position: "absolute",
    bottom: 10,
    right: 20,
    left: 20,
    elevation: 0,
    height: 70,
    borderRadius: 15,
  },
  pressedBtn: {
    opacity: 0.25,
  },
});
