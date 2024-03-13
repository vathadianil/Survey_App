import { useState } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/styles";
const local_data = [
  {
    value: "ALL",
    label: "All",
  },
  {
    value: "YES",
    label: "Visited",
  },
  {
    value: "NO",
    label: "Not Visited",
  },
];

const CustomMenu = ({ value, onChangeValue }) => {
  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={150}
      value={value}
      data={local_data}
      valueField="value"
      labelField="label"
      placeholder={""}
      onChange={(e) => {
        onChangeValue(e.value);
      }}
      renderRightIcon={() => (
        <Ionicons
          style={styles.icon}
          color={Colors.black}
          name="filter-circle-outline"
          size={24}
        />
      )}
    />
  );
};

export default CustomMenu;

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    paddingHorizontal: 16,
  },

  selectedTextStyle: {
    fontSize: 12,
    fontFamily: "light",
  },
});
