import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import StudentPersonalDetails from "../components/Student/StudentPersonalDetails";
import Button from "../components/ui/Button";
import { Colors } from "../constants/styles";
import StudentEducationDetails from "../components/Student/StudentEducationDetails";
import StudentRegistrationDetails from "../components/Student/StudentRegistrationDetails";

const StudentDetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.appBar}>
        <Pressable
          android_ripple={{ color: Colors.shadowColor }}
          style={({ pressed }) => pressed && styles.pressedBtn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-circle" size={32} />
        </Pressable>
        <View style={[styles.editBtnContainer]}>
          <Button
            onPress={() =>
              navigation.navigate("StudentForm", { isEditing: true })
            }
            icon={"create-outline"}
          >
            Edit
          </Button>
        </View>
      </View>
      <ScrollView>
        <View style={styles.wrapper}>
          <StudentPersonalDetails />
          <StudentEducationDetails />
          <StudentRegistrationDetails />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentDetailsScreen;

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  wrapper: {
    marginBottom: 100,
  },
  pressedBtn: { opacity: 0.25 },
});
