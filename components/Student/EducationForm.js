import { StyleSheet } from "react-native";
import { List, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import CustomInput from "../ui/paper/CustomInput";
import CustomDropdown from "../ui/paper/CustomDropdown";
import { useEffect, useState } from "react";
import axios from "../../util/axios";
import {
  GET_COURSE_OR_GROUP_LIST,
  GET_STREAM_PROGRAM_LIST,
} from "../../util/apiRequests";

const EducationForm = ({
  previousEducationDropdownData,
  hallTicketInputData,
  schoolOrCollegeNameInputData,
  admissionCategoryDropDownData,
  levelDropDownData,
  streamProgramDropDownData,
  courseOrGroupDropDownData,
  mediumDropDownData,
  passedOutYearInputData,
  formList,
  onToggleSnackBar,
}) => {
  const [streamProgramList, setStreamProgramList] = useState([]);
  const [courseOrGroupList, setCourseOrGroupList] = useState([]);
  const {
    value: previousEducation,
    hasError: previousEducationHasError,
    valueChangeHandler: previousEducationChangeHandler,
    inputBlurHandler: previousEducationBlurHandler,
  } = previousEducationDropdownData;

  const {
    value: hallTicket,
    hasError: hallTicketHasError,
    valueChangeHandler: hallTicketChangeHandler,
    inputBlurHandler: hallTicketBlurHandler,
  } = hallTicketInputData;

  const {
    value: passedOutYear,
    hasError: passedOutYearHasError,
    valueChangeHandler: passedOutYearChangeHandler,
    inputBlurHandler: passedOutYearBlurHandler,
  } = passedOutYearInputData;

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
    value: level,
    hasError: levelHasError,
    valueChangeHandler: levelChangeHandler,
    inputBlurHandler: levelBlurHandler,
  } = levelDropDownData;

  const {
    value: streamProgram,
    hasError: streamProgramHasError,
    valueChangeHandler: streamProgramChangeHandler,
    inputBlurHandler: streamProgramBlurHandler,
  } = streamProgramDropDownData;

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

  const getStreamProgramList = async (level) => {
    try {
      const { data } = await axios.get(`${GET_STREAM_PROGRAM_LIST}/${level}`);
      setStreamProgramList(data?.data);
    } catch (error) {
      console.log(error);
      onToggleSnackBar();
    }
  };

  const getCourseorGroupList = async (level, streamProgram) => {
    try {
      const { data } = await axios.get(
        `${GET_COURSE_OR_GROUP_LIST}/${level}/${streamProgram}`
      );
      setCourseOrGroupList(data?.data);
    } catch (error) {
      console.log(error);
      onToggleSnackBar();
    }
  };

  useEffect(() => {
    if (level) {
      getStreamProgramList(level);
    }
  }, [level]);

  useEffect(() => {
    if (level && streamProgram) {
      getCourseorGroupList(level, streamProgram);
    }
  }, [streamProgram]);

  return (
    <Card mode="elevated" style={styles.container}>
      <List.Accordion
        id="two"
        titleStyle={styles.accordionText}
        rippleColor={Colors.primary400}
        title="Education Details"
        left={(props) => <Ionicons {...props} name="book-outline" size={20} />}
      >
        <CustomDropdown
          label={"Previous Education*"}
          style={styles.inputContainer}
          errorText={"Previous Education selection is required"}
          data={formList?.previousEducationList}
          value={previousEducation}
          onBlurHanlder={previousEducationBlurHandler}
          onValueChange={previousEducationChangeHandler}
          hasError={previousEducationHasError}
        />

        <CustomInput
          label={"Last Studied School/College*"}
          style={styles.inputContainer}
          errorText={"Last Studied School/College Name is Required"}
          value={schoolOrCollegeName}
          onBlurHanlder={schoolOrCollegeNameBlurHandler}
          onValueChange={schoolOrCollegeNameChangeHandler}
          hasError={schoolOrCollegeNameHasError}
        />

        <CustomInput
          label={"Hall Ticket Number*"}
          style={styles.inputContainer}
          errorText={"Hall Ticket Number is Required"}
          value={hallTicket}
          onBlurHanlder={hallTicketBlurHandler}
          onValueChange={hallTicketChangeHandler}
          hasError={hallTicketHasError}
        />

        <CustomInput
          label={"Passed Out Year*"}
          style={styles.inputContainer}
          numberkeyBoard={true}
          errorText={"Passed Out Year Number is Required"}
          value={passedOutYear}
          onBlurHanlder={passedOutYearBlurHandler}
          onValueChange={passedOutYearChangeHandler}
          hasError={passedOutYearHasError}
        />

        <CustomDropdown
          label={"Admission Category*"}
          style={styles.inputContainer}
          errorText={"Admission category selection is required"}
          data={formList?.admissionCategoryList}
          value={admissionCategory}
          onBlurHanlder={admissionCategoryBlurHandler}
          onValueChange={admissionCategoryChangeHandler}
          hasError={admissionCategoryHasError}
        />

        <CustomDropdown
          label={"Level *"}
          style={styles.inputContainer}
          errorText={"Level selection is required"}
          data={formList?.levelList}
          value={level}
          onBlurHanlder={levelBlurHandler}
          onValueChange={levelChangeHandler}
          hasError={levelHasError}
        />

        {level && (
          <CustomDropdown
            label={"Stream Program *"}
            style={styles.inputContainer}
            errorText={"Stream Program selection is required"}
            data={streamProgramList}
            value={streamProgram}
            onBlurHanlder={streamProgramBlurHandler}
            onValueChange={streamProgramChangeHandler}
            hasError={streamProgramHasError}
          />
        )}

        {level && streamProgram && (
          <CustomDropdown
            label={"Course/Group*"}
            style={styles.inputContainer}
            errorText={"Course/Group selection is required"}
            data={courseOrGroupList}
            value={courseorGroup}
            onBlurHanlder={courseorGroupBlurHandler}
            onValueChange={courseorGroupChangeHandler}
            hasError={courseorGroupHasError}
          />
        )}
        <CustomDropdown
          label={"Medium*"}
          style={styles.inputContainer}
          errorText={"Medium selection is required"}
          data={formList?.mediumList}
          value={medium}
          onBlurHanlder={mediumBlurHandler}
          onValueChange={mediumChangeHandler}
          hasError={mediumHasError}
        />
      </List.Accordion>
    </Card>
  );
};

export default EducationForm;

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
