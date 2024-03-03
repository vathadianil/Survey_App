import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Colors } from "../constants/styles";
import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/Auth";
import { Snackbar } from "react-native-paper";

const LoginScreen = () => {
  const authCtx = useContext(AuthContext);
  const [isAuthenticatung, setIsAuthenticating] = useState(false);

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  async function loginHndlr({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);

      authCtx.authenticate(token);
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
        <AuthContent onAuthenticate={loginHndlr} isLogin={true} />
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Ok",
            onPress: () => {
              onDismissSnackBar();
            },
          }}
        >
          Could not Log you in. Please check your Credentials and Try Again!
        </Snackbar>
      </View>
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
});
