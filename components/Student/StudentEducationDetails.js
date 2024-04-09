import { StyleSheet, Text, View } from "react-native";
import { AppContext } from "../../store/app-context";
import { useContext } from "react";
import StudentRow from "./StudentRow";
import { Colors } from "../../constants/styles";

const StudentEducationDetails = () => {
  const { studentData } = useContext(AppContext);
  const {
    previousEducation,
    lastStudiedAt,
    hallTicketNo,
    passedOutYear,
    admissionCategory,
    courseGroup,
    medium,
  } = studentData;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Education Details</Text>
      {previousEducation && (
        <StudentRow
          label={"Previous Education"}
          data={previousEducation}
          icon={"book-outline"}
          type={"ionicons"}
        />
      )}
      {lastStudiedAt && (
        <StudentRow
          label={"School"}
          data={lastStudiedAt}
          icon={"school-outline"}
          type={"ionicons"}
        />
      )}
      {hallTicketNo && (
        <StudentRow
          label={"Hall Ticket No"}
          data={hallTicketNo}
          icon={"pencil-outline"}
          type={"ionicons"}
        />
      )}
      {passedOutYear && (
        <StudentRow
          label={"Passed Out Year"}
          data={passedOutYear}
          icon={"calendar-number-outline"}
          type={"ionicons"}
        />
      )}
      {admissionCategory && (
        <StudentRow
          label={"Admission Category"}
          data={admissionCategory}
          icon={"bulb-outline"}
          type={"ionicons"}
        />
      )}
      {courseGroup && (
        <StudentRow
          label={"Course/Group"}
          data={courseGroup}
          icon={"save-outline"}
          type={"ionicons"}
        />
      )}
      {medium && (
        <StudentRow
          label={"Medium"}
          data={medium}
          icon={"text-outline"}
          type={"ionicons"}
        />
      )}
    </View>
  );
};

export default StudentEducationDetails;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  title: {
    paddingHorizontal: 16,
    paddingTop: 16,
    fontSize: 18,
    fontFamily: "semibold",
    color: Colors.gray,
  },
});
