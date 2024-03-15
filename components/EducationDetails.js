import { StyleSheet } from "react-native";
import { List, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
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

const EducationDetails = ({
  hallTicketInputData,
  schoolOrCollegeNameInputData,
  admissionCategoryDropDownData,
  courseOrGroupDropDownData,
  mediumDropDownData,
  registrationFeePaidRadioData,
  formList,
}) => {
  const {
    value: hallTicket,
    hasError: hallTicketHasError,
    valueChangeHandler: hallTicketChangeHandler,
    inputBlurHandler: hallTicketBlurHandler,
  } = hallTicketInputData;

  const {
    value: schoolOrCollegeName,
    hasError: schoolOrCollegeNameHasError,
    valueChangeHandler: schoolOrCollegeNameChangeHandler,
    inputBlurHandler: schoolOrCollegeNameBlurHandler,
  } = schoolOrCollegeNameInputData;

  const {
    value: admissionCategory,
    hasError: admissionCategoryHasError,
    valueChangeHandler: admissionCategoryChangeHandler,
    inputBlurHandler: admissionCategoryBlurHandler,
  } = admissionCategoryDropDownData;

  const {
    value: courseorGroup,
    hasError: courseorGroupHasError,
    valueChangeHandler: courseorGroupChangeHandler,
    inputBlurHandler: courseorGroupBlurHandler,
  } = courseOrGroupDropDownData;

  const {
    value: medium,
    hasError: mediumHasError,
    valueChangeHandler: mediumChangeHandler,
    inputBlurHandler: mediumBlurHandler,
  } = mediumDropDownData;

  const {
    value: registrationFeePaid,
    valueChangeHandler: registrationFeePaidChangeHandler,
  } = registrationFeePaidRadioData;

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
          label={"Hall Ticket Number"}
          style={styles.inputContainer}
          errorText={"Hall Ticket Number is Required"}
          value={hallTicket}
          onBlurHanlder={hallTicketBlurHandler}
          onValueChange={hallTicketChangeHandler}
          hasError={hallTicketHasError}
        />

        <CustomInput
          label={"Last Studied School/College"}
          style={styles.inputContainer}
          errorText={"Last Studied School/College Name is Required"}
          value={schoolOrCollegeName}
          onBlurHanlder={schoolOrCollegeNameBlurHandler}
          onValueChange={schoolOrCollegeNameChangeHandler}
          hasError={schoolOrCollegeNameHasError}
        />
        {/* 
        <CustomDropdown
          label={"Admission Category"}
          style={styles.inputContainer}
          errorText={"Admission category selection is required"}
          data={admissionCategoryList}
          value={admissionCategory}
          onBlurHanlder={admissionCategoryBlurHandler}
          onValueChange={admissionCategoryChangeHandler}
          hasError={admissionCategoryHasError}
        /> */}

        {/* <CustomDropdown
          label={"Course/Group"}
          style={styles.inputContainer}
          errorText={"Course/Group selection is required"}
          data={courseOrGroupList}
          value={courseorGroup}
          onBlurHanlder={courseorGroupBlurHandler}
          onValueChange={courseorGroupChangeHandler}
          hasError={courseorGroupHasError}
        /> */}

        <CustomDropdown
          label={"Medium"}
          style={styles.inputContainer}
          errorText={"Medium selection is required"}
          data={formList?.mediumList}
          value={medium}
          onBlurHanlder={mediumBlurHandler}
          onValueChange={mediumChangeHandler}
          hasError={mediumHasError}
        />

        <CustomRadio
          label={"Registration Fee Paid"}
          style={[styles.inputContainer, { marginBottom: 30 }]}
          value={registrationFeePaid}
          onValueChange={registrationFeePaidChangeHandler}
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
});
