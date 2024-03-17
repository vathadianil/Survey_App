import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";

const CustomSnackBar = ({ visible, message, onDismissSnackBar }) => {
  return (
    <View style={styles.container}>
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

    justifyContent: "center",
    alignItems: "center",
  },
});
