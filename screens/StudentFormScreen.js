import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/styles";
import { useContext, useState } from "react";
import { AppContext } from "../store/app-context";
import CustomSwitch from "../components/ui/paper/CustomSwitch";
import StudentForm from "../components/Student/StudentForm";
import AppBar from "../components/ui/AppBar";

const StudentFormScreen = ({ navigation }) => {
  const { studentData } = useContext(AppContext);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
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

  const onFormSubmitted = () => {
    setIsFormSubmitted(true);
  };

  return (
    <SafeAreaView>
      <AppBar
        onPress={() =>
          isFormSubmitted
            ? navigation.navigate("Home", {
                submittedTimeStamp: new Date().getTime(),
              })
            : navigation.goBack()
        }
        title={studentName ? studentName : "Add Details"}
      />
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
  container: {
    marginVertical: 16,
    marginHorizontal: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: Platform.select({ android: "hidden" }),
  },
});
