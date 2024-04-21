import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import PersonalForm from "./PersonalForm";
import EducationForm from "./EducationForm";
import { useContext, useReducer } from "react";
import useInput from "../../util/hooks/useInput";
import Button from "../ui/Button";
import axios from "../../util/axios";
import useImage from "../../util/hooks/useImage";
import { AppContext } from "../../store/app-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../constants/styles";
import CustomSnackBar from "../ui/paper/CustomSnackBar";
import useSnackBar from "../../util/hooks/useSnackBar";
import { baseURL } from "../../util/axios";
import AddressForm from "./AddressForm";
import {
  ADD_STUDENT_DETAILS,
  UPDATE_STUDENT_DETAILS,
} from "../../util/apiRequests";

const initialState = {
  isSuccess: false,
  submitted: false,
  loading: false,
  message: "",
};

const formSubmitReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_LOADING":
      return {
        ...state,
        submitted: true,
        loading: true,
        message: "",
      };
    case "SUCCESS":
      return {
        ...state,
        isSuccess: true,
        loading: false,
        message: action.message ? action.message : "",
      };
    case "FAILURE":
      return {
        ...state,
        isSuccess: false,
        loading: false,
        message: action.message,
      };
    default:
      return state;
  }
};

const convertDateToString = (date) => {
  const day = date?.getDate();
  const month = date?.getMonth() + 1;
  const year = date?.getFullYear();
  return `${day}-${month}-${year}`;
};

const convertDateStringToDate = (dateString) => {
  const dateArray = dateString.split("-");
  const date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
  return date;
};

function validateText(text) {
  const isValid = !!String(text)?.trim();
  return isValid;
}

function validateMobileNo(text) {
  const regExp = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
  if (regExp.test(text)) {
    return true;
  }
  return false;
}

function validateDateOfBirth(birthday) {
  // birthday is a date
  const ageDifMs = Date.now() - birthday;
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  if (+age >= 14) {
    return true;
  }
  return false;
}

function getInitialValue(list, value) {
  if (!value) {
    return "";
  } else if (list?.findIndex((item) => item.value === value) === -1) {
    return "Other";
  } else {
    return value;
  }
}

const StudentForm = ({
  isVisitedSwitchOn,
  isInterestSwitchOn,
  onFormSubmitted,
}) => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { isEditing } = params;
  const { visible, onToggleSnackBar, onDismissSnackBar } = useSnackBar();
  const { formList, studentData, loginData, addStudentData } =
    useContext(AppContext);
  const [formState, dispatchFormState] = useReducer(
    formSubmitReducer,
    initialState
  );

  const {
    id,
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
    passedOutYear,
    lastStudiedAt,
    admissionCategory,
    courseGroup,
    medium,
    insertBy,
    courseLevel,
    streamProgram,
  } = studentData;

  const {
    fatherOccupationList,
    motherOccupationList,
    religionList,
    casteList,
    subCasteList,
  } = formList;

  const { agentId, userId } = loginData;

  const studentNameInputData = useInput(
    studentName ? studentName : "",
    validateText
  );
  const fatherNameInputData = useInput(
    fatherName ? fatherName : "",
    validateText
  );
  const fatherOccupationDropDownData = useInput(
    getInitialValue(fatherOccupationList, fOccupation),
    validateText
  );
  const fatherOccupationInputnData = useInput(fOccupation, validateText);
  const motherNameInputData = useInput(
    motherName ? motherName : "",
    validateText
  );
  const motherOccupationDropDownData = useInput(
    getInitialValue(motherOccupationList, mOccupation),
    validateText
  );
  const motherOccupationInputnData = useInput(mOccupation, validateText);
  const genderRadioData = useInput(gender ? gender : "", validateText);
  const physicallyChallengedRadioData = useInput(
    disability ? disability : "NO",
    validateText
  );
  const religionDropDownData = useInput(
    getInitialValue(religionList, religion),
    validateText
  );
  const motherTongueInputData = useInput(
    motherTounge ? motherTounge : "",
    validateText
  );
  const casteDropDownData = useInput(
    getInitialValue(casteList, caste),
    validateText
  );
  const subCasteDropDownData = useInput(
    getInitialValue(subCasteList, subCaste),
    validateText
  );
  const mobileNumberInputData = useInput(
    mobileNumber ? mobileNumber : "",
    validateMobileNo
  );
  const alternateMobileNoInputData = useInput(
    alternateMNo ? alternateMNo : "",
    validateMobileNo
  );
  const dateOfBirthDateData = useInput(
    dob ? convertDateStringToDate(dob) : new Date(),
    validateDateOfBirth,
    "dob"
  );
  const aadharNoInputData = useInput(
    aadharNo ? aadharNo + "" : "",
    validateText
  );
  const photoImagePickerData = useImage(
    `${baseURL}/get-photo/${id}?random=${new Date().getTime()}`
  );
  const signImagePickerData = useImage(
    `${baseURL}/get-sign/${id}?random=${new Date().getTime()}`
  );

  const districtDropDownData = useInput("", validateText);
  const mandalDropDownData = useInput("", validateText);
  const villageDropDownData = useInput("", validateText);

  const previousEducationDropdownData = useInput(
    previousEducation ? previousEducation : "",
    validateText
  );
  const hallTicketInputData = useInput(
    hallTicketNo ? hallTicketNo : "",
    validateText
  );

  const passedOutYearInputData = useInput(
    passedOutYear ? passedOutYear : "",
    validateText
  );

  const schoolOrCollegeNameInputData = useInput(
    lastStudiedAt ? lastStudiedAt : "",
    validateText
  );
  const admissionCategoryDropDownData = useInput(
    admissionCategory ? admissionCategory : "",
    validateText
  );
  const courseLevelDropDownData = useInput(
    courseLevel ? courseLevel : "",
    validateText
  );
  const streamProgramDropDownData = useInput(
    streamProgram ? streamProgram : "",
    validateText
  );
  const courseOrGroupDropDownData = useInput(
    courseGroup ? courseGroup : "",
    validateText
  );
  const mediumDropDownData = useInput(medium ? medium : "", validateText);

  let formIsValid = false;
  if (isVisitedSwitchOn && !isInterestSwitchOn) {
    formIsValid = true;
  } else if (
    studentNameInputData.isValid &&
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
    (!isEditing || !photoImagePickerData.isValid) &&
    (!isEditing || !photoImagePickerData.uploadedImageHasError) &&
    (!isEditing || !signImagePickerData.isValid) &&
    (!isEditing || !signImagePickerData.uploadedImageHasError) &&
    previousEducationDropdownData.isValid &&
    hallTicketInputData.isValid &&
    passedOutYearInputData.isValid &&
    schoolOrCollegeNameInputData.isValid &&
    admissionCategoryDropDownData.isValid &&
    courseLevelDropDownData.isValid &&
    streamProgramDropDownData.isValid &&
    courseOrGroupDropDownData.isValid &&
    mediumDropDownData.isValid
  ) {
    if (
      (fatherOccupationDropDownData.value === "Other" &&
        !fatherOccupationInputnData.isValid) ||
      (motherOccupationDropDownData.value === "Other" &&
        !motherOccupationInputnData.isValid)
    ) {
      formIsValid = false;
    } else {
      if (
        !isEditing &&
        (!mandalDropDownData.isValid ||
          !districtDropDownData.isValid ||
          !villageDropDownData.isValid)
      ) {
        formIsValid = false;
      } else {
        formIsValid = true;
      }
    }
  }

  const inValidFormSubmitHandler = () => {
    studentNameInputData.formStateChangeHandler();
    fatherNameInputData.formStateChangeHandler();
    fatherOccupationDropDownData.formStateChangeHandler();
    motherNameInputData.formStateChangeHandler();
    motherOccupationDropDownData.formStateChangeHandler();
    genderRadioData.formStateChangeHandler();
    physicallyChallengedRadioData.formStateChangeHandler();
    religionDropDownData.formStateChangeHandler();
    motherTongueInputData.formStateChangeHandler();
    casteDropDownData.formStateChangeHandler();
    subCasteDropDownData.formStateChangeHandler();
    mobileNumberInputData.formStateChangeHandler();
    dateOfBirthDateData.formStateChangeHandler();
    aadharNoInputData.formStateChangeHandler();
    previousEducationDropdownData.formStateChangeHandler();
    hallTicketInputData.formStateChangeHandler();
    passedOutYearInputData.formStateChangeHandler();
    schoolOrCollegeNameInputData.formStateChangeHandler();
    admissionCategoryDropDownData.formStateChangeHandler();
    courseLevelDropDownData.formStateChangeHandler();
    streamProgramDropDownData.formStateChangeHandler();
    courseOrGroupDropDownData.formStateChangeHandler();
    mediumDropDownData.formStateChangeHandler();
    !isEditing && mandalDropDownData.formStateChangeHandler();
    !isEditing && districtDropDownData.formStateChangeHandler();
    !isEditing && villageDropDownData.formStateChangeHandler();
  };

  const handleSubmit = async () => {
    if (!studentNameInputData.value || !formIsValid) {
      dispatchFormState({
        type: "FAILURE",
        message: "Please Add required Details and Try Again!",
      });
      onToggleSnackBar();
      inValidFormSubmitHandler();
      return;
    }
    try {
      let formValues = {
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
        alternateMNo: alternateMobileNoInputData.value,
        dob: convertDateToString(dateOfBirthDateData.value),
        aadharNo: aadharNoInputData.value,
        previousEducation: previousEducationDropdownData.value,
        hallTicketNo: hallTicketInputData.value,
        passedOutYear: passedOutYearInputData.value,
        lastStudiedAt: schoolOrCollegeNameInputData.value,
        admissionCategory: admissionCategoryDropDownData.value,
        courseLevel: courseLevelDropDownData.value,
        streamProgram: streamProgramDropDownData.value,
        courseGroup: courseOrGroupDropDownData.value,
        medium: mediumDropDownData.value,
        visitedStatus: isVisitedSwitchOn ? "Yes" : "No",
        intrestedStatus: isInterestSwitchOn ? "Yes" : "No",
        district: districtDropDownData.value,
        mandal: mandalDropDownData.value,
        villege: villageDropDownData.value,
        agentID: agentId + "",
        insertBy: insertBy ? insertBy : "",
        updateBy: userId,
      };
      if (!isEditing) {
        formValues = {
          ...formValues,
          photoPath: "",
          signPath: "",
          fatherMobileNo: "",
          insertBy: userId,
          permanentAddress: `${villageDropDownData.value} ${mandalDropDownData.value} ${districtDropDownData.value}`,
        };
      } else {
        formValues = { ...formValues, studentId: id + "" ? id + "" : "" };
      }
      dispatchFormState({
        type: "SUBMIT_LOADING",
      });
      onFormSubmitted();
      const result = isEditing
        ? await axios.post(UPDATE_STUDENT_DETAILS, formValues)
        : await axios.post(ADD_STUDENT_DETAILS, formValues);

      if (
        result?.data?.returnCode === 1 &&
        result?.data?.returnMessage === "Success"
      ) {
        dispatchFormState({
          type: "SUCCESS",
          message: "Data Submitted Successfully",
        });
        onToggleSnackBar();

        if (isEditing) {
          if (isInterestSwitchOn) {
            navigation.navigate("Checkout");
          } else {
            navigation.navigate("Home", {
              submittedTimeStamp: new Date().getTime(),
            });
          }
        } else {
          const studentData = { ...formValues, id: result?.data?.studentId };
          addStudentData(studentData);
          navigation.navigate("UploadPhoto");
        }
      } else {
        dispatchFormState({
          type: "FAILURE",
          message:
            "Something went wrong, Unable to Submit the Details. Please Try Again!",
        });
      }
      onToggleSnackBar();
    } catch (error) {
      console.log(error);
      dispatchFormState({
        type: "FAILURE",
        message:
          "Something went wrong, Unable to Submit the Details. Please Try Again!",
      });
      onToggleSnackBar();
    }
  };

  return (
    <View>
      <CustomSnackBar
        onDismissSnackBar={onDismissSnackBar}
        visible={visible}
        message={
          formState.message
            ? formState.message
            : "Something went wrong! Please Try Again"
        }
        style={styles.snackBarStyle}
      />
      {isVisitedSwitchOn && isInterestSwitchOn && (
        <List.AccordionGroup>
          <PersonalForm
            id={id}
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
            isEditing={isEditing}
          />
          {!isEditing && (
            <AddressForm
              districtDropDownData={districtDropDownData}
              mandalDropDownData={mandalDropDownData}
              villageDropDownData={villageDropDownData}
              formList={formList}
              onToggleSnackBar={onToggleSnackBar}
            />
          )}
          <EducationForm
            previousEducationDropdownData={previousEducationDropdownData}
            hallTicketInputData={hallTicketInputData}
            schoolOrCollegeNameInputData={schoolOrCollegeNameInputData}
            admissionCategoryDropDownData={admissionCategoryDropDownData}
            courseLevelDropDownData={courseLevelDropDownData}
            streamProgramDropDownData={streamProgramDropDownData}
            courseOrGroupDropDownData={courseOrGroupDropDownData}
            mediumDropDownData={mediumDropDownData}
            passedOutYearInputData={passedOutYearInputData}
            onToggleSnackBar={onToggleSnackBar}
            formList={formList}
          />
        </List.AccordionGroup>
      )}
      {isVisitedSwitchOn && (
        <View style={styles.btnContainer}>
          <Button
            style={styles.btn}
            disabled={formState.loading}
            onPress={handleSubmit}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {formState.submitted && formState.loading && (
                <ActivityIndicator
                  animating={true}
                  color={Colors.black}
                  style={{ marginLeft: 10 }}
                />
              )}
              <Text style={{ color: Colors.white }}>Submit</Text>
            </View>
          </Button>
        </View>
      )}
    </View>
  );
};

export default StudentForm;

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: "center",
    marginBottom: 100,
  },
  btn: {
    width: "30%",
  },
  snackBarStyle: {
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
  },
});
