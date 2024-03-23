import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

const AppBar = ({ onPress, title, style }) => {
  return (
    <View style={[styles.appBar, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: Colors.shadowColor }}
        style={({ pressed }) => pressed && styles.pressedBtn}
      >
        <Ionicons name="chevron-back-circle" size={32} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View></View>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 12,
  },
  title: {
    fontFamily: "semibold",
    fontSize: 16,
    color: Colors.gray,
    textTransform: "capitalize",
  },
  pressedBtn: {
    opacity: 0.25,
  },
});
