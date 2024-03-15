import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Colors } from "../constants/styles";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/Auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Snackbar } from "react-native-paper";
import { AppContext } from "../store/app-context";

const SingUpScreen = () => {
  const appCtx = useContext(AppContext);
  const [isAuthenticatung, setIsAuthenticating] = useState(false);

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  async function signUpHndlr({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      console.log(token);
      appCtx.authenticate(token);
    } catch (error) {
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
        <AuthContent onAuthenticate={signUpHndlr} />
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

export default SingUpScreen;

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
    fontWeight: "bold",
  },
});
