import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { Colors } from "../constants/styles";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import Button from "../components/ui/Button";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const authCtx = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.drawerItemContainer}>
        <Button
          style={styles.drawerItem}
          icon={"exit"}
          onPress={authCtx.logout}
        >
          Log Out
        </Button>
      </View>
    </DrawerContentScrollView>
  );
}

export default function AuthenticatedDrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="StudentOverView"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Home",
          headerTitleStyle: { display: "none" },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <View style={styles.container}>
              <Pressable
                style={[
                  ({ pressed }) => pressed && styles.pressedBtn,
                  styles.innerContainer,
                ]}
                android_ripple={{ color: Colors.black }}
                onPress={() => {
                  navigation.navigate("LocationSearch");
                }}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Add</Text>
                  <Text style={styles.text}>Location</Text>
                </View>
                <Ionicons name="location-sharp" size={30} />
              </Pressable>
            </View>
          ),
        })}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    elevation: 6,
    backgroundColor: Colors.shadowColor,
    borderRadius: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: Platform.select({ android: "hidden" }),
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 4,
    overflow: "hidden",
  },
  textContainer: {
    alignItems: "center",
    marginRight: 4,
  },
  text: {
    fontSize: 8,
    fontWeight: "bold",
  },
  drawerItemContainer: {
    alignItems: "center",
    marginTop: "190%",
  },
  drawerItem: {
    width: "50%",
    backgroundColor: Colors.error500,
  },
  pressedBtn: {
    opacity: 0.25,
  },
});
