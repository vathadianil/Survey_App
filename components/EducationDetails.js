import { StyleSheet } from "react-native";
import { List, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { useState } from "react";
import CustomInput from "./ui/paper/CustomInput";
import CustomDropdown from "./ui/paper/CustomDropdown";
import CustomRadio from "./ui/paper/CustomRadio";

const admissionCategoryList = [
  { label: "Convener", value: "Convener" },
  { label: "Management", value: "Management" },
  { label: "Spot", value: "Spot" },
  { label: "Regular", value: "Regular" },
  { label: "On Transfer Certificate", value: "On Transfer Certificate" },
  { label: "Lateral Entry", value: "Lateral Entry" },
];

const courseOrGroupList = [
  { label: "Engineering", value: "Engineering" },
  { label: "Inter", value: "Inter" },
];

const mediumList = [
  { label: "English", value: "English" },
  { label: "Telugu", value: "Telugu" },
];

const EducationDetails = () => {
  const [admissionCategory, setAdmissionCategory] = useState(null);
  const [isAdmissionCategoryFocus, setIsAdmissionCategoryFocus] =
    useState(false);

  const [courseOrGroup, setCourseOrGroup] = useState(null);
  const [isCourseOrGroupFocus, setIsCourseOrGroupFocus] = useState(false);

  const [medium, setMedimum] = useState(null);
  const [isMediumFocus, setIsMediumFocus] = useState(false);

  const [physicallyChallenged, setPhysicallyChallenged] = useState("no");
  const [registrationFeePaid, setRegistrationFeePaid] = useState("no");

  const onPhysicallyChallengedValueChange = (newValue) => {
    setPhysicallyChallenged(newValue);
  };

  const onRegistrationFeePaidValueChange = (newValue) => {
    setRegistrationFeePaid(newValue);
  };

  const toggleFocusForAdmissionCategory = (value) => {
    setIsAdmissionCategoryFocus(value);
  };

  const onAdmissionCategoryValueChange = (value) => {
    setAdmissionCategory(value);
  };

  const toggleFocusForCourseOrGroup = (value) => {
    setIsCourseOrGroupFocus(value);
  };

  const onCourseOrGroupValueChange = (value) => {
    setCourseOrGroup(value);
  };

  const toggleFocusForMedium = (value) => {
    setIsMediumFocus(value);
  };

  const onMediumValueChange = (value) => {
    setMedimum(value);
  };

  return (
    <Card mode="elevated" style={styles.container}>
      <List.Accordion
        id="two"
        titleStyle={styles.accordionText}
        rippleColor={Colors.primary400}
        title="Education Details"
        left={(props) => (
          <Ionicons {...props} name="person-add-outline" size={20} />
        )}
      >
        <CustomInput
          label={"SSC Hall Ticket Number"}
          style={styles.inputContainer}
        />
        <CustomInput
          label={"Last Studied School/College"}
          style={styles.inputContainer}
        />

        <CustomDropdown
          label={"Admission Category"}
          style={styles.inputContainer}
          data={admissionCategoryList}
          value={admissionCategory}
          isFocus={isAdmissionCategoryFocus}
          onFocusChange={toggleFocusForAdmissionCategory}
          onValueChange={onAdmissionCategoryValueChange}
        />

        <CustomRadio
          label={"Physically Challanged"}
          style={styles.inputContainer}
          value={physicallyChallenged}
          onValueChange={onPhysicallyChallengedValueChange}
          data={[
            { value: "yes", displayText: "Yes" },
            { value: "no", displayText: "No" },
          ]}
          radioGroupAlignVertical={true}
        />

        <CustomDropdown
          label={"Course/Group"}
          style={styles.inputContainer}
          data={courseOrGroupList}
          value={courseOrGroup}
          isFocus={isCourseOrGroupFocus}
          onFocusChange={toggleFocusForCourseOrGroup}
          onValueChange={onCourseOrGroupValueChange}
        />

        <CustomDropdown
          label={"Medium"}
          style={styles.inputContainer}
          data={mediumList}
          value={medium}
          isFocus={isMediumFocus}
          onFocusChange={toggleFocusForMedium}
          onValueChange={onMediumValueChange}
        />

        <CustomRadio
          label={"Registration Fee Paid"}
          style={styles.inputContainer}
          value={registrationFeePaid}
          onValueChange={onRegistrationFeePaidValueChange}
          data={[
            { value: "yes", displayText: "Yes" },
            { value: "no", displayText: "No" },
          ]}
          radioGroupAlignVertical={true}
        />
      </List.Accordion>
    </Card>
  );
};

export default EducationDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  accordionText: {
    fontFamily: "regular",
    fontSize: 14,
  },
  inputContainer: {
    marginRight: 35,
    marginBottom: 20,
  },
  textInputContent: {
    fontFamily: "regular",
  },

  radioGroupContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  radioGroupLable: {
    fontFamily: "regular",
    fontSize: 16,
  },
  radioLabelText: {
    fontFamily: "light",
  },
});
