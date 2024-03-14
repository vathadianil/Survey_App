import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";
import { useContext, useReducer } from "react";
import useInput from "../util/hooks/useInput";
import Button from "../components/ui/Button";
import axios from "../util/axios";
import useImage from "../util/hooks/useImage";
import { AuthContext } from "../store/auth-context";

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

const StudentDetailsForm = ({
  isVisitedSwitchOn,
  isInterestSwitchOn,
  gender,
  mobileNumber = "",
  formList,
}) => {
  const authCtx = useContext(AuthContext);

  const [formState, dispatchFormState] = useReducer(
    formSubmitReducer,
    initialState
  );

  const studentNameInputData = useInput("", validateText);
  const fatherNameInputData = useInput("", validateText);
  const fatherOccupationDropDownData = useInput("", validateText);
  const fatherOccupationInputnData = useInput("", validateText);
  const motherNameInputData = useInput("", validateText);
  const motherOccupationDropDownData = useInput("", validateText);
  const motherOccupationInputnData = useInput("", validateText);
  const genderRadioData = useInput(gender, validateText);
  const physicallyChallengedRadioData = useInput("no", validateText);
  const religionDropDownData = useInput("", validateText);
  const motherTongueInputData = useInput("", validateText);
  const casteDropDownData = useInput("", validateText);
  const subCasteDropDownData = useInput("", validateText);
  const mobileNumberInputData = useInput(mobileNumber, validateText);
  const alternateMobileNoInputData = useInput("", validateText);
  const dateOfBirthDateData = useInput(new Date(), validateText);
  const aadharNoInputData = useInput("", validateText);
  const photoImagePickerData = useImage(
    { uriImage: "", base64Image: "" },
    validateText
  );
  const signImagePickerData = useImage(
    { uriImage: "", base64Image: "" },
    validateText
  );

  const hallTicketInputData = useInput("", validateText);
  const schoolOrCollegeNameInputData = useInput("", validateText);
  const admissionCategoryDropDownData = useInput("", validateText);
  const courseOrGroupDropDownData = useInput("", validateText);
  const mediumDropDownData = useInput("", validateText);
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
      visited: isVisitedSwitchOn ? "Yes" : "No",
      interested: isInterestSwitchOn ? "Yes" : "No",
      studentName: studentNameInputData.value,
      fatherName: fatherNameInputData.value,
      fatherOccupation:
        fatherOccupationDropDownData.value === "Other"
          ? fatherOccupationInputnData.value
          : fatherOccupationDropDownData.value,
      motherName: motherNameInputData.value,
      motherOccupation:
        motherOccupationDropDownData.value === "Other"
          ? motherOccupationInputnData.value
          : motherOccupationDropDownData.value,
      gender: genderRadioData.value,
      physicallyChallenged: physicallyChallengedRadioData.value,
      religion: religionDropDownData.value,
      motherTongue: motherTongueInputData.value,
      caste: casteDropDownData.value,
      subCaste: subCasteDropDownData.value,
      mobileNumber: mobileNumberInputData.value,
      alternateMobileNo: dateOfBirthDateData.value,
      dateOfBirth: convertDateToString(dateOfBirthDateData.value),
      aadharNo: aadharNoInputData.value,
      studentImage: photoImagePickerData?.value?.base64Image,
      signImage: signImagePickerData?.value?.base64Image,
      hallTicket: hallTicketInputData.value,
      schoolOrCollegeName: schoolOrCollegeNameInputData.value,
      admissionCategory: admissionCategoryDropDownData.value,
      courseOrGroup: courseOrGroupDropDownData.value,
      medium: mediumDropDownData.value,
      registrationFeePaid: registrationFeePaidRadioData.value,
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
            hallTicketInputData={hallTicketInputData}
            schoolOrCollegeNameInputData={schoolOrCollegeNameInputData}
            admissionCategoryDropDownData={admissionCategoryDropDownData}
            courseOrGroupDropDownData={courseOrGroupDropDownData}
            mediumDropDownData={mediumDropDownData}
            registrationFeePaidRadioData={registrationFeePaidRadioData}
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
