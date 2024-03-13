import { StyleSheet, View } from "react-native";
import { List, Card, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";

import CustomInput from "./ui/paper/CustomInput";
import CustomRadio from "./ui/paper/CustomRadio";
import CustomDropdown from "./ui/paper/CustomDropdown";
import CustomDatePicker from "./ui/CustomDatePicker";
import ImagePicker from "./ui/ImagePicker";

const religionList = [
  { label: "Hindu", value: "Hindu" },
  { label: "Christian", value: "Christian" },
];

const occupationList = [
  { label: "Farmer", value: "farmer" },
  { label: "Doctor", value: "Doctor" },
  { label: "Other", value: "Other" },
];

const casteList = [
  { label: "OC", value: "OC" },
  { label: "BC", value: "BC" },
];

const PersonalDetails = ({
  studentNameInputData,
  fatherNameInputData,
  fatherOccupationDropDownData,
  fatherOccupationInputnData,
  motherNameInputData,
  motherOccupationDropDownData,
  motherOccupationInputnData,
  genderRadioData,
  physicallyChallengedRadioData,
  religionDropDownData,
  motherTongueInputData,
  casteDropDownData,
  subCasteDropDownData,
  mobileNumberInputData,
  alternateMobileNoInputData,
  dateOfBirthDateData,
  aadharNoInputData,
  photoImagePickerData,
  signImagePickerData,
}) => {
  const {
    value: studentName,
    hasError: studentNameHasError,
    valueChangeHandler: studentNameChangeHandler,
    inputBlurHandler: studentNameBlurHandler,
  } = studentNameInputData;

  const {
    value: fatherName,
    hasError: fatherNameHasError,
    valueChangeHandler: fatherNameChangeHandler,
    inputBlurHandler: fatherNameBlurHandler,
  } = fatherNameInputData;

  const {
    value: fatherOccuDropdownValue,
    hasError: fatherOccuDropdownValueHasError,
    valueChangeHandler: fatherOccuDropdownValueChangeHandler,
    inputBlurHandler: fatherOccuDropdownValueBlurHandler,
  } = fatherOccupationDropDownData;

  const {
    value: fatherOccuInputValue,
    hasError: fatherOccuInputValueHasError,
    valueChangeHandler: fatherOccuInputValueChangeHandler,
    inputBlurHandler: fatherOccuInputValueBlurHandler,
  } = fatherOccupationInputnData;

  const {
    value: motherOccuDropdownValue,
    hasError: motherOccuDropdownValueHasError,
    valueChangeHandler: motherOccuDropdownValueChangeHandler,
    inputBlurHandler: motherOccuDropdownValueBlurHandler,
  } = motherOccupationDropDownData;

  const {
    value: motherOccuInputValue,
    hasError: motherOccuInputValueHasError,
    valueChangeHandler: motherOccuInputValueChangeHandler,
    inputBlurHandler: motherOccuInputValueBlurHandler,
  } = motherOccupationInputnData;

  const {
    value: motherName,
    hasError: motherNameHasError,
    valueChangeHandler: motherNameChangeHandler,
    inputBlurHandler: motherNameBlurHandler,
  } = motherNameInputData;

  const { value: gender, valueChangeHandler: genderChangeHandler } =
    genderRadioData;

  const {
    value: physicallyChallenged,
    valueChangeHandler: physicallyChallengedChangeHandler,
  } = physicallyChallengedRadioData;

  const {
    value: religion,
    hasError: religionHasError,
    valueChangeHandler: religionChangeHandler,
    inputBlurHandler: religionBlurHandler,
  } = religionDropDownData;

  const {
    value: motherTongue,
    hasError: motherTongueHasError,
    valueChangeHandler: motherTongueChangeHandler,
    inputBlurHandler: motherTongueBlurHandler,
  } = motherTongueInputData;

  const {
    value: casteDropDown,
    hasError: casteDropDownHasError,
    valueChangeHandler: casteDropDownChangeHandler,
    inputBlurHandler: casteDropDownBlurHandler,
  } = casteDropDownData;

  const {
    value: subCasteDropdown,
    hasError: subCasteDropdownHasError,
    valueChangeHandler: subCasteDropdownChangeHandler,
    inputBlurHandler: subCasteDropdownBlurHandler,
  } = subCasteDropDownData;

  const {
    value: mobileNumber,
    hasError: mobileNumberHasError,
    valueChangeHandler: mobileNumberChangeHandler,
    inputBlurHandler: mobileNumberBlurHandler,
  } = mobileNumberInputData;

  const {
    value: alternateMobileNo,
    valueChangeHandler: alternateMobileNoChangeHandler,
  } = alternateMobileNoInputData;

  const {
    value: dateOfBirth,
    hasError: dateOfBirthHasError,
    valueChangeHandler: dateOfBirthChangeHandler,
    inputBlurHandler: dateOfBirthBlurHandler,
  } = dateOfBirthDateData;

  const {
    value: aadharNo,
    hasError: aadharNoHasError,
    valueChangeHandler: aadharNoChangeHandler,
    inputBlurHandler: aadharNoBlurHandler,
  } = aadharNoInputData;

  const {
    value: photo,
    hasError: photoHasError,
    valueChangeHandler: photoChangeHandler,
  } = photoImagePickerData;

  const {
    value: sign,
    hasError: signHasError,
    valueChangeHandler: signChangeHandler,
  } = signImagePickerData;

  return (
    <Card mode="elevated" style={styles.container}>
      <List.Accordion
        id="one"
        titleStyle={[styles.accordionText]}
        rippleColor={Colors.primary400}
        title="Personal Details"
        left={(props) => (
          <Ionicons {...props} name="person-add-outline" size={20} />
        )}
      >
        <CustomInput
          label={"Student Name(As Per SSC)"}
          errorText={"Student Name is Required"}
          style={styles.inputContainer}
          value={studentName}
          onValueChange={studentNameChangeHandler}
          onBlurHanlder={studentNameBlurHandler}
          hasError={studentNameHasError}
        />

        <CustomInput
          label={"Father Name"}
          style={styles.inputContainer}
          errorText={"Father Name is Required"}
          value={fatherName}
          onValueChange={fatherNameChangeHandler}
          onBlurHanlder={fatherNameBlurHandler}
          hasError={fatherNameHasError}
        />

        <CustomDropdown
          label={"Father Occupation"}
          style={styles.inputContainer}
          errorText={"Father Occupation selection is required"}
          data={occupationList}
          value={fatherOccuDropdownValue}
          onBlurHanlder={fatherOccuDropdownValueBlurHandler}
          onValueChange={fatherOccuDropdownValueChangeHandler}
          hasError={fatherOccuDropdownValueHasError}
        />

        {fatherOccuDropdownValue === "Other" && (
          <CustomInput
            label={"Enter Father Occupation"}
            style={styles.inputContainer}
            errorText={"Father Occupation is Required"}
            value={fatherOccuInputValue}
            onBlurHanlder={fatherOccuInputValueBlurHandler}
            onValueChange={fatherOccuInputValueChangeHandler}
            hasError={fatherOccuInputValueHasError}
          />
        )}

        <CustomInput
          label={"Mother Name"}
          style={styles.inputContainer}
          errorText={"Mother Name is Required"}
          value={motherName}
          onBlurHanlder={motherNameBlurHandler}
          onValueChange={motherNameChangeHandler}
          hasError={motherNameHasError}
        />

        <CustomDropdown
          label={"Mother Occupation"}
          style={styles.inputContainer}
          errorText={"Mother Occupation selection is required"}
          data={occupationList}
          value={motherOccuDropdownValue}
          onBlurHanlder={motherOccuDropdownValueBlurHandler}
          onValueChange={motherOccuDropdownValueChangeHandler}
          hasError={motherOccuDropdownValueHasError}
        />

        {motherOccuDropdownValue === "Other" && (
          <CustomInput
            label={"Enter Mother Occupation"}
            style={styles.inputContainer}
            errorText={"Mother Occupation is Required"}
            value={motherOccuInputValue}
            onBlurHanlder={motherOccuInputValueBlurHandler}
            onValueChange={motherOccuInputValueChangeHandler}
            hasError={motherOccuInputValueHasError}
          />
        )}

        <CustomRadio
          label={"Gender"}
          style={[styles.inputContainer, { marginBottom: 30 }]}
          value={gender}
          onValueChange={genderChangeHandler}
          data={[
            { value: "male", displayText: "Male" },
            { value: "female", displayText: "Female" },
          ]}
        />

        <CustomRadio
          label={"Physically Challanged"}
          style={[styles.inputContainer, { marginBottom: 30 }]}
          value={physicallyChallenged}
          onValueChange={physicallyChallengedChangeHandler}
          data={[
            { value: "yes", displayText: "Yes" },
            { value: "no", displayText: "No" },
          ]}
          radioGroupAlignVertical={true}
        />

        <CustomDropdown
          label={"Religion"}
          style={styles.inputContainer}
          errorText={"Religion selection is required"}
          data={religionList}
          value={religion}
          onBlurHanlder={religionBlurHandler}
          onValueChange={religionChangeHandler}
          hasError={religionHasError}
        />

        <CustomInput
          label={"Mother Tongue"}
          style={styles.inputContainer}
          errorText={"Mother Tongue is Required"}
          value={motherTongue}
          onBlurHanlder={motherTongueBlurHandler}
          onValueChange={motherTongueChangeHandler}
          hasError={motherTongueHasError}
        />

        <CustomDropdown
          label={"Caste"}
          style={styles.inputContainer}
          errorText={"Caste selection is required"}
          data={casteList}
          value={casteDropDown}
          onBlurHanlder={casteDropDownBlurHandler}
          onValueChange={casteDropDownChangeHandler}
          hasError={casteDropDownHasError}
        />

        <CustomDropdown
          label={"Sub Caste"}
          style={styles.inputContainer}
          errorText={"Sub Caste selection is required"}
          data={casteList}
          value={subCasteDropdown}
          onBlurHanlder={subCasteDropdownBlurHandler}
          onValueChange={subCasteDropdownChangeHandler}
          hasError={subCasteDropdownHasError}
        />

        <CustomInput
          label={"Mobile"}
          style={styles.inputContainer}
          errorText={"Mobile Number is Required"}
          value={mobileNumber}
          onBlurHanlder={mobileNumberBlurHandler}
          onValueChange={mobileNumberChangeHandler}
          hasError={mobileNumberHasError}
        />

        <CustomInput
          label={"Alternate Mobile Number"}
          style={styles.inputContainer}
          value={alternateMobileNo}
          onValueChange={alternateMobileNoChangeHandler}
        />
        <CustomDatePicker
          label={"Date Of Birth"}
          style={styles.inputContainer}
          errorText={"Date of Birth is Required"}
          value={dateOfBirth}
          onBlurHanlder={dateOfBirthBlurHandler}
          onValueChange={dateOfBirthChangeHandler}
          hasError={dateOfBirthHasError}
          readOnly={true}
          showIcon={true}
        />
        <CustomInput
          label={"Aadhar Number"}
          style={styles.inputContainer}
          errorText={"Aadhar Number is Required"}
          value={aadharNo}
          onBlurHanlder={aadharNoBlurHandler}
          onValueChange={aadharNoChangeHandler}
          hasError={aadharNoHasError}
        />

        <ImagePicker
          style={[styles.inputContainer, { marginBottom: 40 }]}
          label={"Take Pic"}
          lottieImageType={"pic"}
          pickedImage={photo.uriImage}
          takeImageHandler={photoChangeHandler}
          hasError={photoHasError}
          errorText={"Image is required"}
        />

        <ImagePicker
          style={[styles.inputContainer, { marginBottom: 40 }]}
          label={"Take Sign"}
          lottieImageType={"sign"}
          pickedImage={sign.uriImage}
          takeImageHandler={signChangeHandler}
          hasError={signHasError}
          errorText={"Sign is required"}
        />
      </List.Accordion>
    </Card>
  );
};

export default PersonalDetails;

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