import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";

const CustomSnackBar = ({ visible, message, onDismissSnackBar, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Snackbar
        action={{
          label: "Ok",
        }}
        duration={7000}
        visible={visible}
        onDismiss={onDismissSnackBar}
      >
        {message}
      </Snackbar>
    </View>
  );
};

export default CustomSnackBar;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // bottom: 100,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
