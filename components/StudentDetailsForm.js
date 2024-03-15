import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";
import { useContext, useReducer } from "react";
import useInput from "../util/hooks/useInput";
import Button from "../components/ui/Button";
import axios from "../util/axios";
import useImage from "../util/hooks/useImage";
import { AppContext } from "../store/app-context";

const initialState = {
  isSuccess: false,
  submitted: false,
  loading: false,
};

const formSubmitReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_LOADING":
      return {
        ...state,
        submitted: true,
        loading: true,
      };
    case "SUCCESS":
      return {
        ...state,
        isSuccess: true,
        loading: false,
      };
    case "FAILURE":
      return {
        ...state,
        isSuccess: false,
        loading: false,
      };
    default:
      return state;
  }
};

function validateText(text) {
  const isValid = !!String(text)?.trim();
  return isValid;
}

function getInitialValue(list, value) {
  if (!value) {
    return "";
  } else if (list.findIndex((item) => item.value === value) === -1) {
    return "Other";
  } else {
    return value;
  }
}

const StudentDetailsForm = ({ isVisitedSwitchOn, isInterestSwitchOn }) => {
  const { formList, studentData } = useContext(AppContext);
  const [formState, dispatchFormState] = useReducer(
    formSubmitReducer,
    initialState
  );

  const {
    studentName,
    fatherName,
    fOccupation,
    motherName,
    mOccupation,
    gender,
    disability,
    religion,
    motherTounge,
    caste,
    subCaste,
    mobileNumber,
    alternateMNo,
    dob,
    aadharNo,
    previousEducation,
    hallTicketNo,
    lastStudiedAt,
    admissionCategory,
    courseGroup,
    medium,
  } = studentData;

  const {
    fatherOccupationList,
    motherOccupationList,
    religionList,
    casteList,
    subCasteList,
  } = formList;

  const studentNameInputData = useInput(studentName, validateText);
  const fatherNameInputData = useInput(fatherName, validateText);
  const fatherOccupationDropDownData = useInput(
    getInitialValue(fatherOccupationList, fOccupation),
    validateText
  );
  const fatherOccupationInputnData = useInput(fOccupation, validateText);
  const motherNameInputData = useInput(motherName, validateText);
  const motherOccupationDropDownData = useInput(
    getInitialValue(motherOccupationList, mOccupation),
    validateText
  );
  const motherOccupationInputnData = useInput(mOccupation, validateText);
  const genderRadioData = useInput(gender, validateText);
  const physicallyChallengedRadioData = useInput(
    disability ? disability : "NO",
    validateText
  );
  const religionDropDownData = useInput(
    getInitialValue(religionList, religion),
    validateText
  );
  const motherTongueInputData = useInput(motherTounge, validateText);
  const casteDropDownData = useInput(
    getInitialValue(casteList, caste),
    validateText
  );
  const subCasteDropDownData = useInput(
    getInitialValue(subCasteList, subCaste),
    validateText
  );
  const mobileNumberInputData = useInput(mobileNumber, validateText);
  const alternateMobileNoInputData = useInput(alternateMNo, validateText);
  const dateOfBirthDateData = useInput(dob ? dob : new Date(), validateText);
  const aadharNoInputData = useInput(aadharNo, validateText);
  const photoImagePickerData = useImage(
    { uriImage: "", base64Image: "" },
    validateText
  );
  const signImagePickerData = useImage(
    { uriImage: "", base64Image: "" },
    validateText
  );

  const previousEducationDropdownData = useInput(
    previousEducation,
    validateText
  );
  const hallTicketInputData = useInput(hallTicketNo, validateText);
  const schoolOrCollegeNameInputData = useInput(lastStudiedAt, validateText);
  const admissionCategoryDropDownData = useInput(
    admissionCategory,
    validateText
  );
  const courseOrGroupDropDownData = useInput(courseGroup, validateText);
  const mediumDropDownData = useInput(medium, validateText);
  const registrationFeePaidRadioData = useInput("no", validateText);

  let formIsValid = false;
  if (isVisitedSwitchOn && !isInterestSwitchOn) {
    formIsValid = true;
  } else if (
    (studentNameInputData,
    fatherNameInputData.isValid &&
      fatherOccupationDropDownData.isValid &&
      motherNameInputData.isValid &&
      motherOccupationDropDownData.isValid &&
      genderRadioData.isValid &&
      physicallyChallengedRadioData.isValid &&
      religionDropDownData.isValid &&
      motherTongueInputData.isValid &&
      casteDropDownData.isValid &&
      subCasteDropDownData.isValid &&
      mobileNumberInputData.isValid &&
      dateOfBirthDateData.isValid &&
      aadharNoInputData.isValid &&
      photoImagePickerData.isValid &&
      signImagePickerData.isValid &&
      previousEducationDropdownData.isValid &&
      hallTicketInputData.isValid &&
      schoolOrCollegeNameInputData.isValid &&
      admissionCategoryDropDownData.isValid &&
      courseOrGroupDropDownData.isValid &&
      mediumDropDownData.isValid &&
      registrationFeePaidRadioData.isValid)
  ) {
    if (
      (fatherOccupationDropDownData.value === "Other" &&
        !fatherOccupationInputnData.isValid) ||
      (motherOccupationDropDownData.value === "Other" &&
        !motherOccupationInputnData.isValid)
    ) {
      formIsValid = false;
    } else {
      formIsValid = true;
    }
  }

  const convertDateToString = (date) => {
    const day = date?.getDate();
    const month = date?.getMonth() + 1;
    const year = date?.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async () => {
    const formValues = {
      studentName: studentNameInputData.value,
      fatherName: fatherNameInputData.value,
      fOccupation:
        fatherOccupationDropDownData.value === "Other"
          ? fatherOccupationInputnData.value
          : fatherOccupationDropDownData.value,
      motherName: motherNameInputData.value,
      mOccupation:
        motherOccupationDropDownData.value === "Other"
          ? motherOccupationInputnData.value
          : motherOccupationDropDownData.value,
      gender: genderRadioData.value,
      disability: physicallyChallengedRadioData.value,
      religion: religionDropDownData.value,
      motherTounge: motherTongueInputData.value,
      caste: casteDropDownData.value,
      subCaste: subCasteDropDownData.value,
      mobileNumber: mobileNumberInputData.value,
      alternateMNo: dateOfBirthDateData.value,
      dob: convertDateToString(dateOfBirthDateData.value),
      aadharNo: aadharNoInputData.value,
      studentImage: photoImagePickerData?.value?.base64Image,
      signImage: signImagePickerData?.value?.base64Image,
      previousEducation: previousEducationDropdownData.value,
      hallTicketNo: hallTicketInputData.value,
      lastStudiedAt: schoolOrCollegeNameInputData.value,
      admissionCategory: admissionCategoryDropDownData.value,
      courseGroup: courseOrGroupDropDownData.value,
      medium: mediumDropDownData.value,
      registrationFeePaid: registrationFeePaidRadioData.value,
      visitedStatus: isVisitedSwitchOn ? "Yes" : "No",
      intrestedStatus: isInterestSwitchOn ? "Yes" : "No",
    };

    dispatchFormState({
      type: "SUBMIT_LOADING",
    });
    try {
      const result = await axios.post("/update_student_details", formValues);
      if (
        result?.data.returnCode === 1 &&
        result.data.returnMessage === "Success"
      ) {
        dispatchFormState({
          type: "SUCCESS",
        });
      } else {
        dispatchFormState({
          type: "FAILURE",
        });
      }
    } catch (error) {
      dispatchFormState({
        type: "FAILURE",
      });
    }
  };

  return (
    <View>
      {isVisitedSwitchOn && isInterestSwitchOn && (
        <List.AccordionGroup>
          <PersonalDetails
            studentNameInputData={studentNameInputData}
            fatherNameInputData={fatherNameInputData}
            fatherOccupationDropDownData={fatherOccupationDropDownData}
            fatherOccupationInputnData={fatherOccupationInputnData}
            motherNameInputData={motherNameInputData}
            motherOccupationDropDownData={motherOccupationDropDownData}
            motherOccupationInputnData={motherOccupationInputnData}
            genderRadioData={genderRadioData}
            physicallyChallengedRadioData={physicallyChallengedRadioData}
            religionDropDownData={religionDropDownData}
            motherTongueInputData={motherTongueInputData}
            casteDropDownData={casteDropDownData}
            subCasteDropDownData={subCasteDropDownData}
            mobileNumberInputData={mobileNumberInputData}
            alternateMobileNoInputData={alternateMobileNoInputData}
            dateOfBirthDateData={dateOfBirthDateData}
            aadharNoInputData={aadharNoInputData}
            photoImagePickerData={photoImagePickerData}
            signImagePickerData={signImagePickerData}
            formList={formList}
          />
          <EducationDetails
            previousEducationDropdownData={previousEducationDropdownData}
            hallTicketInputData={hallTicketInputData}
            schoolOrCollegeNameInputData={schoolOrCollegeNameInputData}
            admissionCategoryDropDownData={admissionCategoryDropDownData}
            courseOrGroupDropDownData={courseOrGroupDropDownData}
            mediumDropDownData={mediumDropDownData}
            registrationFeePaidRadioData={registrationFeePaidRadioData}
            formList={formList}
          />
        </List.AccordionGroup>
      )}
      {isVisitedSwitchOn && (
        <View style={styles.btnContainer}>
          <Button
            style={styles.btn}
            disabled={!formIsValid}
            onPress={handleSubmit}
          >
            Submit
          </Button>
        </View>
      )}
    </View>
  );
};

export default StudentDetailsForm;

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: "center",
    marginBottom: 70,
  },
  btn: {
    width: "30%",
  },
});
