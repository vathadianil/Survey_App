import { StatusBar } from "expo-status-bar";
import { useCallback, useContext, useEffect, useState } from "react";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import AuthenticatedStack from "./navigation/AuthenticatedStack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AppContextProvider, { AppContext } from "./store/app-context";

function Navigation() {
  const appCtx = useContext(AppContext);

  return (
    <NavigationContainer>
      {appCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function Root() {
  const appCtx = useContext(AppContext);
  const [isTokenFetching, setIsTokenFetching] = useState(true);
  useEffect(() => {
    async function fetchToken() {
      setIsTokenFetching(true);
      const storedData = await AsyncStorage.getItem("loginData");
      const loginData = await JSON.parse(storedData);
      if (loginData?.token) {
        appCtx.authenticate(loginData);
      }
      setIsTokenFetching(false);
    }
    fetchToken();
  }, []);
  if (isTokenFetching) {
    return <LoadingOverlay />;
  }
  return <Navigation />;
}

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <StatusBar style="dark" />
      <AppContextProvider>
        <Root />
      </AppContextProvider>
    </>
  );
}
