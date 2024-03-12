import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";
import { useReducer } from "react";
import useInput from "../util/hooks/useInput";
import Button from "../components/ui/Button";

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
  const isValid = !!text?.trim();
  return isValid;
}

const StudentDetailsForm = ({
  isVisitedSwitchOn,
  isInterestSwitchOn,
  gender,
  mobileNumber = "",
}) => {
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
  const religionDropDownData = useInput("", validateText);
  const motherTongueInputData = useInput("", validateText);
  const casteDropDownData = useInput("", validateText);
  const subCasteDropDownData = useInput("", validateText);
  const mobileNumberInputData = useInput(mobileNumber, validateText);
  const alternateMobileNoInputDate = useInput("", validateText);

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
    religionDropDownData.isValid &&
    motherTongueInputData.isValid &&
    casteDropDownData.isValid &&
    subCasteDropDownData.isValid &&
    mobileNumberInputData.isValid
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
            religionDropDownData={religionDropDownData}
            motherTongueInputData={motherTongueInputData}
            casteDropDownData={casteDropDownData}
            subCasteDropDownData={subCasteDropDownData}
            mobileNumberInputData={mobileNumberInputData}
            alternateMobileNoInputDate={alternateMobileNoInputDate}
          />
          {/* <EducationDetails /> */}
        </List.AccordionGroup>
      )}
      {isVisitedSwitchOn && (
        <View style={styles.btnContainer}>
          <Button style={styles.btn} disabled={!formIsValid}>
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
