import { Alert, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import AuthForm from "./AuthForm";
import { Colors } from "../../constants/styles";
import FlatButton from "../ui/FlatButton";
import { Snackbar } from "react-native-paper";

const AuthContent = ({ isLogin, onAuthenticate }) => {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      // Alert.alert("Invalid input", "Please check your entered credentials.");
      onToggleSnackBar();
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "LOGIN" : "SIGN UP"}</Text>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.flatBtnContainer}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? (
            <Text>
              <View>
                <Text style={styles.normalText}>Create a</Text>
              </View>
              <View style={styles.btnHighlightContainer}>
                <Text style={styles.btnHighlightText}>New Account</Text>
              </View>
            </Text>
          ) : (
            <Text>
              <View style={styles.btnHighlightContainer}>
                <Text style={styles.btnHighlightText}>Log In</Text>
              </View>
              <View>
                <Text style={styles.normalText}>instead</Text>
              </View>
            </Text>
          )}
        </FlatButton>
      </View>
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
        Please check your entered credentials.
      </Snackbar>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "semibold",
    marginBottom: 32,
  },
  flatBtnContainer: {
    marginTop: 24,
  },
  btnHighlightContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary500,
  },
  btnHighlightText: {
    marginHorizontal: 6,
    textAlign: "center",
    fontFamily: "bold",
    color: Colors.primary800,
  },
  normalText: {
    fontFamily: "regular",
  },
});
