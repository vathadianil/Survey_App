import { StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/styles";
import { HelperText, TextInput } from "react-native-paper";

const CustomInput = ({
  label,
  style,
  onValueChange,
  value,
  onBlurHanlder,
  hasError,
  errorText,
  numberkeyBoard = false,
}) => {
  return (
    <View style={[style]}>
      <TextInput
        label={label}
        mode="outlined"
        value={value}
        keyboardType={numberkeyBoard ? "number-pad" : "default"}
        onChangeText={onValueChange}
        onBlur={onBlurHanlder}
        activeOutlineColor={hasError ? Colors.error800 : Colors.primary800}
        outlineColor={hasError ? Colors.error800 : Colors.primary800}
        contentStyle={[styles.textInputContent]}
      />
      <HelperText type="error" visible={hasError}>
        {errorText}
      </HelperText>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  textInputContent: {
    fontFamily: "regular",
  },
});
