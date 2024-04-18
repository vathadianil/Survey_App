import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudentDetailsScreen from "../screens/StudentDetailsScreen";
import AuthenticatedTabNavigation from "./AuthenticatedTabNavigation";
import StudentFormScreen from "../screens/StudentFormScreen";
import UploadPhotoScreen from "../screens/UploadPhotoScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import PaymentCompleteScreen from "../screens/PaymentCompleteScreen";
import RegistrationDetailsScreen from "../screens/RegistrationDetailsScreen";
import { DISTRICT } from "../constants/location-names";
import DistrictLocationSearchScreen from "../screens/LocationSearch/DistrictLocationSearchScreen";
import MandalLocationSearchScreen from "../screens/LocationSearch/MandalLocationSearchScreen";
import VilllageLocationSearchScreen from "../screens/LocationSearch/VilllageLocationSearchScreen";

const Stack = createNativeStackNavigator();

export default function AuthenticatedStack() {
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
        name="StudentForm"
        component={StudentFormScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UploadPhoto"
        component={UploadPhotoScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentComplete"
        component={PaymentCompleteScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="RegistrationDetails"
        component={RegistrationDetailsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DistrictLocationSearch"
        initialParams={{ locationKey: DISTRICT }}
        component={DistrictLocationSearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MandalLocationSearch"
        component={MandalLocationSearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VillageLocationSearch"
        component={VilllageLocationSearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
