import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import AuthenticatedStack from "./navigation/AuthenticatedStack";

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);
  const [isTokenFetching, setIsTokenFetching] = useState(true);
  useEffect(() => {
    async function fetchToken() {
      setIsTokenFetching(true);
      const storedToken = await AsyncStorage.getItem("toekn");
      if (storedToken) {
        authCtx.authenticate(storedToken);
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
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
