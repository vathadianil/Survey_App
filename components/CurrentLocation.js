import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";

const CurrentLocation = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          ({ pressed }) => pressed && styles.pressedBtn,
          styles.innerContainer,
        ]}
        android_ripple={{ color: Colors.black }}
        onPress={() => {
          navigation.navigate("LocationSearch");
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Add</Text>
          <Text style={styles.text}>Location</Text>
        </View>
        <Ionicons name="location-outline" size={30} />
      </Pressable>
    </View>
  );
};

export default CurrentLocation;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    backgroundColor: Colors.shadowColor,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: Platform.select({ android: "hidden" }),
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 4,
    overflow: "hidden",
  },
  textContainer: {
    alignItems: "center",
    marginRight: 4,
  },
  text: {
    fontSize: 10,
    fontFamily: "medium",
  },
  drawerItemContainer: {
    alignItems: "center",
    marginTop: "190%",
  },
  drawerItem: {
    width: "50%",
    backgroundColor: Colors.error500,
  },
  pressedBtn: {
    opacity: 0.25,
  },
});
