import { StyleSheet, View } from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "../../../constants/styles";

const CustomDropdown = ({
  label,
  style,
  data,
  isFocus,
  value,
  onFocusChange,
  onValueChange,
}) => {
  return (
    <View style={style}>
      <Dropdown
        style={[
          styles.dropdown,
          { borderColor: Colors.primary800, borderWidth: 1 },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? label : "..."}
        searchPlaceholder={`Search ${label}...`}
        value={value}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
        onChange={(item) => {
          onValueChange(item.value);
          onFocusChange(false);
        }}
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 8,
    fontFamily: "light",
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 8,
    fontFamily: "regular",
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: "regular",
    borderColor: Colors.primary800,
    borderRadius: 4,
  },
});
