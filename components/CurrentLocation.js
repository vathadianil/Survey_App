import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

const CurrentLocation = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  return (
    <View style={styles.appBar}>
      <Text style={styles.location}>Andhra Pradesh</Text>
      <Pressable onPress={() => navigation.navigate("LocationSearch")}>
        <Ionicons name="location-outline" size={24} />
      </Pressable>
    </View>
  );
};

export default CurrentLocation;

const styles = StyleSheet.create({
  appBar: {
    marginHorizontal: 16,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontFamily: "semibold",
    fontSize: 12,
    color: Colors.gray,
  },
});
