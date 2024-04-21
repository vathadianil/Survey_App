import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RadioButton } from "react-native-paper";
import { Colors } from "../../../constants/styles";

const CustomRadio = ({
  value,
  onValueChange,
  label,
  style,
  data,
  radioGroupAlignVertical = false,
}) => {
  const RenderRadioButton = ({ value, displayText }) => {
    return (
      <View style={styles.radioBtnContainer}>
        <RadioButton.Item
          label={displayText}
          value={value}
          color={Colors.primary800}
        />
        {/* <Text style={styles.radioLabelText}>{displayText}</Text> */}
      </View>
    );
  };
  return (
    <View style={[styles.radioGroupContainer, style]}>
      <Text style={styles.radioGroupLable}>{label}</Text>
      <RadioButton.Group onValueChange={onValueChange} value={value}>
        <View style={radioGroupAlignVertical ? "" : styles.radioGroupContainer}>
          {data?.map((item) => (
            <RenderRadioButton key={item.value} {...item} />
          ))}
        </View>
      </RadioButton.Group>
    </View>
  );
};

export default CustomRadio;

const styles = StyleSheet.create({
  radioGroupContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginLeft: 12,
  },
  radioGroupLable: {
    fontFamily: "regular",
    fontSize: 16,
  },
  radioLabelText: {
    fontFamily: "light",
  },
});
