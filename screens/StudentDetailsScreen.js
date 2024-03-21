import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import StudentPersonalDetails from "../components/Student/StudentPersonalDetails";

const StudentDetailsScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.appBar}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-circle" size={32} />
        </Pressable>
      </View>
      <ScrollView>
        <StudentPersonalDetails />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentDetailsScreen;

const styles = StyleSheet.create({
  appBar: {
    marginHorizontal: 16,
    marginTop: 12,
  },
});
