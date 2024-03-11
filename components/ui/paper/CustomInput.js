import { StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/styles";
import { TextInput } from "react-native-paper";

const CustomInput = ({ label, style }) => {
  return (
    <View style={[style]}>
      <TextInput
        label={label}
        mode="outlined"
        activeOutlineColor={Colors.primary800}
        outlineColor={Colors.primary800}
        contentStyle={styles.textInputContent}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  textInputContent: {
    fontFamily: "regular",
  },
});
