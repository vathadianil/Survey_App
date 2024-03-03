import { StyleSheet, Text, View } from "react-native";
import Input from "../components/ui/Input";
import { useState } from "react";
import { Colors } from "../constants/styles";

const LocationSearchScreen = () => {
  const [enteredInput, setEnteredInput] = useState("");
  function updateInputValueHandler(enteredValue) {
    setEnteredInput(enteredValue);
  }
  return (
    <View style={styles.innerContainer}>
      <Input
        placeholder="Search"
        onUpdateValue={updateInputValueHandler.bind(this)}
        value={enteredInput}
        style={styles.input}
        iconName={"search"}
      />
    </View>
  );
};

export default LocationSearchScreen;

const styles = StyleSheet.create({
  innerContainer: {
    width: "100%",
    marginVertical: 32,
  },
  input: {
    padding: 16,
    backgroundColor: Colors.white,
  },
});
