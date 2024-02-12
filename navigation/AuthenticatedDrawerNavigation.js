import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { Colors } from "../constants/styles";
import { StyleSheet, View } from "react-native";
import Input from "../components/ui/Input";
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
  const [enteredInput, setEnteredInput] = useState("");
  function updateInputValueHandler(enteredValue) {
    setEnteredInput(enteredValue);
  }
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="StudentOverView"
        component={HomeScreen}
        options={{
          title: "Home",
          headerTitleStyle: { display: "none" },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <View style={styles.container}>
              <Input
                placeholder="Search Location"
                onUpdateValue={updateInputValueHandler.bind(this)}
                value={enteredInput}
                style={styles.input}
                iconName={"search"}
              />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "120%",
    marginBottom: 4,
  },
  input: {
    padding: 8,
  },
  drawerItemContainer: {
    alignItems: "center",
    marginTop: "190%",
  },
  drawerItem: {
    width: "50%",
    backgroundColor: Colors.error500,
  },
});
