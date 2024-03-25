import { StyleSheet, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Colors } from "../../constants/styles";

const CustomDatePicker = ({
  label,
  style,
  onValueChange,
  value,
  onBlurHanlder,
  hasError,
  errorText,
  readOnly,
  showIcon,
}) => {
  const [show, setShow] = useState(false);

  const onChange = () => {
    setShow(false);
  };
  return (
    <View style={[style]}>
      <TextInput
        label={label}
        mode="outlined"
        value={value?.toDateString()}
        onBlur={onBlurHanlder}
        activeOutlineColor={hasError ? Colors.error800 : Colors.primary800}
        outlineColor={hasError ? Colors.error800 : Colors.primary800}
        contentStyle={[styles.textInputContent]}
        readOnly={readOnly}
        onPressIn={() => setShow(true)}
        right={
          showIcon && (
            <TextInput.Icon icon="calendar" onPress={() => setShow(true)} />
          )
        }
      />
      <HelperText type="error" visible={hasError}>
        {errorText}
      </HelperText>

      {show && (
        <DateTimePicker
          value={value}
          mode={"date"}
          is24Hour={true}
          onChange={(e, selectedDate) => {
            onValueChange(selectedDate);
            onChange();
          }}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({});
