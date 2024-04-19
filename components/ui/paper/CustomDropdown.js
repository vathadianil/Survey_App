import { StyleSheet, View } from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "../../../constants/styles";
import { HelperText } from "react-native-paper";

const CustomDropdown = ({
  label,
  style,
  data,
  value,
  hasError,
  onBlurHanlder,
  onValueChange,
  errorText,
  valueKey,
}) => {
  return (
    <View style={style}>
      <Dropdown
        style={[
          styles.dropdown,
          {
            borderColor: hasError ? Colors.error800 : Colors.primary800,
            borderWidth: 1,
          },
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          hasError && { color: Colors.error800 },
        ]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField={valueKey ? valueKey : "value"}
        valueField={valueKey ? valueKey : "value"}
        placeholder={label}
        searchPlaceholder={`Search ${label}...`}
        value={value}
        onBlur={onBlurHanlder}
        onChange={(item) => {
          onValueChange(valueKey ? item[valueKey] : item.value);
        }}
        keyboardAvoiding={true}
      />
      <HelperText type="error" visible={hasError}>
        {errorText}
      </HelperText>
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
