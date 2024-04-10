import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../store/app-context";
import { useContext } from "react";

const CurrentLocation = ({ location }) => {
  const navigation = useNavigation();
  const appCtx = useContext(AppContext);

  return (
    <View style={styles.appBar}>
      <Text style={styles.location}>{location}</Text>
      <View style={styles.btnContainer}>
        <Pressable
          android_ripple={{ color: Colors.shadowColor }}
          style={({ pressed }) => pressed && styles.pressedBtn}
          onPress={() => {
            appCtx.addStudentData({});
            navigation.navigate("StudentForm", { isEditing: false });
          }}
        >
          <View style={styles.innerContainer}>
            <Ionicons
              name="person-add-outline"
              size={17}
              color={Colors.white}
            />
          </View>
        </Pressable>
      </View>
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
    textTransform: "capitalize",
    fontSize: 14,
    color: Colors.gray,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: Platform.select({ android: "hidden" }),
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  pressedBtn: {
    opacity: 0.25,
  },
});
