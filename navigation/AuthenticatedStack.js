import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import AuthenticatedDrawerNavigation from "./AuthenticatedDrawerNavigation";
import StudentDetailsScreen from "../screens/StudentDetailsScreen";
import LocationSearchScreen from "../screens/LocationSearchScreen";
import AuthenticatedTabNavigation from "./AuthenticatedTabNavigation";

const Stack = createNativeStackNavigator();

export default function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab Navigation"
        component={AuthenticatedTabNavigation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="StudentDetail"
        component={StudentDetailsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="LocationSearch"
        component={LocationSearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
