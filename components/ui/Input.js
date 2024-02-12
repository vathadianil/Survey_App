import { View, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

function Input({
  placeholder,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  style,
  iconName,
  toggleShowPassword,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, style, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        cursorColor={Colors.black}
      />
      <Ionicons
        style={styles.icon}
        name={iconName}
        size={20}
        color={Colors.primary500}
        onPress={toggleShowPassword}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: "70%",
    borderRadius: 8,
    backgroundColor: Colors.shadowColor,
    overflow: "hidden",
    position: "relative",
  },
  icon: { position: "absolute", right: 70 },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
