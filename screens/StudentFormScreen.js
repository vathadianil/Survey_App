import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { useContext, useState } from "react";
import { AppContext } from "../store/app-context";
import CustomSwitch from "../components/ui/paper/CustomSwitch";
import StudentForm from "../components/Student/StudentForm";

const StudentFormScreen = ({ navigation }) => {
  const { studentData } = useContext(AppContext);
  const { studentName, visitedStatus, intrestedStatus } = studentData;

  const [isVisitedSwitchOn, setIsVisitedSwitchOn] = useState(
    visitedStatus?.toLowerCase() === "no" ? false : true
  );
  const [isInterestSwitchOn, setIsInterestSwitchOn] = useState(
    intrestedStatus?.toLowerCase() === "no" ? false : true
  );

  const onToggleVisitedSwitch = () => {
    setIsVisitedSwitchOn((prevState) => !prevState);
  };

  const onToggleInterestSwitch = () => {
    setIsInterestSwitchOn((prevState) => !prevState);
  };

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
        <Text style={styles.title}>{studentName}</Text>
        <View></View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <CustomSwitch
            label={"Visited Status"}
            isSwitchOn={isVisitedSwitchOn}
            onValueChange={onToggleVisitedSwitch}
          />
          {isVisitedSwitchOn && (
            <CustomSwitch
              label={"Interested To Join"}
              isSwitchOn={isInterestSwitchOn}
              onValueChange={onToggleInterestSwitch}
            />
          )}
        </View>
        <StudentForm
          isVisitedSwitchOn={isVisitedSwitchOn}
          isInterestSwitchOn={isInterestSwitchOn}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentFormScreen;

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 12,
  },
  container: {
    marginVertical: 16,
    marginHorizontal: 16,
    paddingHorizontal: 4,
    paddingBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: Platform.select({ android: "hidden" }),
    position: "relative",
  },

  title: {
    fontFamily: "semibold",
    fontSize: 16,
    color: Colors.gray,
    textTransform: "capitalize",
  },
});
