import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import { Colors } from "../constants/styles";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/Auth";
import { AppContext } from "../store/app-context";
import CustomSnackBar from "../components/ui/paper/CustomSnackBar";
import useSnackBar from "../util/hooks/useSnackBar";

const LoginScreen = () => {
  const appCtx = useContext(AppContext);
  const [isAuthenticatung, setIsAuthenticating] = useState(false);
  const { visible, onToggleSnackBar, onDismissSnackBar } = useSnackBar();

  async function loginHndlr({ email, password }) {
    setIsAuthenticating(true);
    try {
      const loginData = await login(email, password);
      appCtx.authenticate(loginData);
    } catch (error) {
      console.log(error);
      onToggleSnackBar();
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticatung) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>WELCOME</Text>
      </View>
      <View style={[styles.innerContainer, styles.formContainer]}>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            <AuthContent onAuthenticate={loginHndlr} isLogin={true} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <CustomSnackBar
        style={styles.snackBarStyle}
        onDismissSnackBar={onDismissSnackBar}
        visible={visible}
        message={
          "Could not Log you in. Please check your Credentials and Try Again!"
        }
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary500,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 2,
    width: "100%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 100,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontFamily: "bold",
  },
  snackBarStyle: {
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
  },
});
