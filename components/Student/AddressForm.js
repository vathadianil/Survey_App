import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Card, List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../ui/paper/CustomInput";
import { Colors } from "../../constants/styles";
import CustomDropdown from "../ui/paper/CustomDropdown";
import { GET_MANDAL_LIST, GET_VILLAGE_LIST } from "../../util/apiRequests";
import axios from "../../util/axios";

const AddressForm = ({
  districtDropDownData,
  mandalDropDownData,
  villageDropDownData,
  formList,
  onToggleSnackBar,
}) => {
  const [mandalList, setMandalList] = useState([]);
  const [villageList, setVillageList] = useState([]);
  const {
    value: district,
    hasError: districtHasError,
    valueChangeHandler: districtChangeHandler,
    inputBlurHandler: districtBlurHandler,
  } = districtDropDownData;
  const {
    value: mandal,
    hasError: mandalHasError,
    valueChangeHandler: mandalChangeHandler,
    inputBlurHandler: mandalBlurHandler,
  } = mandalDropDownData;

  const {
    value: village,
    hasError: villageHasError,
    valueChangeHandler: villageChangeHandler,
    inputBlurHandler: villageBlurHandler,
  } = villageDropDownData;

  const getMandalList = async (mandal) => {
    try {
      const { data } = await axios.get(`${GET_MANDAL_LIST}/${mandal}`);
      setMandalList(data?.data);
    } catch (error) {
      console.log(error);
      onToggleSnackBar();
    }
  };

  const getVillageList = async (district, mandal) => {
    try {
      const { data } = await axios.get(
        `${GET_VILLAGE_LIST}/${district}/${mandal}`
      );
      setVillageList(data?.data);
    } catch (error) {
      console.log(error);
      onToggleSnackBar();
    }
  };

  useEffect(() => {
    if (district) {
      getMandalList(district);
    }
  }, [district]);

  useEffect(() => {
    if (district && mandal) {
      getVillageList(district, mandal);
    }
  }, [mandal]);

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
        <CustomDropdown
          label={"District *"}
          style={styles.inputContainer}
          errorText={"District selection is required"}
          data={formList?.districtList}
          value={district}
          onBlurHanlder={districtBlurHandler}
          onValueChange={districtChangeHandler}
          hasError={districtHasError}
          valueKey={"district"}
        />

        {district && (
          <CustomDropdown
            label={"Mnadal *"}
            style={styles.inputContainer}
            errorText={"Mandal selection is required"}
            data={mandalList}
            value={mandal}
            onBlurHanlder={mandalBlurHandler}
            onValueChange={mandalChangeHandler}
            hasError={mandalHasError}
            valueKey={"mandal"}
          />
        )}

        {district && mandal && (
          <CustomDropdown
            label={"Village *"}
            style={styles.inputContainer}
            errorText={"Village selection is required"}
            data={villageList}
            value={village}
            onBlurHanlder={villageBlurHandler}
            onValueChange={villageChangeHandler}
            hasError={villageHasError}
            valueKey={"villege"}
          />
        )}
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
