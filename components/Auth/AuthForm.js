import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Input from "../ui/Input";
import Button from "../ui/Button";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function toggleShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  function toggleConfirmShowPassword() {
    setShowConfirmPassword((prevState) => !prevState);
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Input
          placeholder="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          style={styles.input}
          iconName={"person"}
        />
      </View>
      {!isLogin && (
        <View style={styles.innerContainer}>
          <Input
            placeholder="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
            style={styles.input}
            iconName={"person"}
          />
        </View>
      )}
      <View style={styles.innerContainer}>
        <Input
          placeholder="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure={!showPassword}
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
          style={styles.input}
          iconName={showPassword ? "eye" : "eye-off"}
          toggleShowPassword={toggleShowPassword}
        />
      </View>
      {!isLogin && (
        <View style={styles.innerContainer}>
          <Input
            placeholder="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure={!showConfirmPassword}
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
            style={styles.input}
            iconName={showConfirmPassword ? "eye" : "eye-off"}
            toggleShowPassword={toggleConfirmShowPassword}
          />
        </View>
      )}
      <View style={styles.btnContainer}>
        <Button onPress={submitHandler}>
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  innerContainer: {
    width: "100%",
    marginBottom: 32,
  },
  input: {
    padding: 16,
    fontFamily: "regular",
  },
  btnContainer: {
    width: "30%",
  },
});
