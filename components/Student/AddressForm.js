import { StyleSheet } from "react-native";
import React from "react";
import { Card, List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../ui/paper/CustomInput";
import { Colors } from "../../constants/styles";

const AddressForm = ({
  mandalInputData,
  districtInputData,
  stateInputData,
}) => {
  const {
    value: mandal,
    hasError: mandalHasError,
    valueChangeHandler: mandalChangeHandler,
    inputBlurHandler: mandalBlurHandler,
  } = mandalInputData;

  const {
    value: district,
    hasError: districtHasError,
    valueChangeHandler: districtChangeHandler,
    inputBlurHandler: districtBlurHandler,
  } = districtInputData;

  const {
    value: state,
    hasError: stateHasError,
    valueChangeHandler: stateChangeHandler,
    inputBlurHandler: stateBlurHandler,
  } = stateInputData;

  return (
    <Card mode="elevated" style={styles.container}>
      <List.Accordion
        id="three"
        titleStyle={styles.accordionText}
        rippleColor={Colors.primary400}
        title="Address Details"
        left={(props) => (
          <Ionicons {...props} name="location-outline" size={20} />
        )}
      >
        <CustomInput
          label={"Mandal"}
          style={styles.inputContainer}
          errorText={"Mandal is Required"}
          value={mandal}
          onBlurHanlder={mandalBlurHandler}
          onValueChange={mandalChangeHandler}
          hasError={mandalHasError}
        />

        <CustomInput
          label={"District"}
          style={styles.inputContainer}
          errorText={"District is Required"}
          value={district}
          onBlurHanlder={districtBlurHandler}
          onValueChange={districtChangeHandler}
          hasError={districtHasError}
        />

        <CustomInput
          label={"State"}
          style={styles.inputContainer}
          errorText={"State is Required"}
          value={state}
          onBlurHanlder={stateBlurHandler}
          onValueChange={stateChangeHandler}
          hasError={stateHasError}
        />
      </List.Accordion>
    </Card>
  );
};

export default AddressForm;

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
