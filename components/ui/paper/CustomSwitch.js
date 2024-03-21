import { Platform, StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { Colors } from "../../../constants/styles";

const CustomSwitch = ({ style, label, isSwitchOn, onValueChange }) => {
  return (
    <View style={[styles.switchContainer, style]}>
      <Text style={styles.switchText}>{label}</Text>
      <Switch
        value={isSwitchOn}
        onValueChange={onValueChange}
        color={Colors.primary800}
      />
    </View>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginBottom: Platform.select({ ios: 12 }),
  },
  switchText: {
    fontFamily: "medium",
  },
});
