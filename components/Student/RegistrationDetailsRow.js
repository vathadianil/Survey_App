import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

const RegistrationDetailsRow = ({ label, data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelStyle}>{label}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataStyle}>{data}</Text>
      </View>
    </View>
  );
};

export default RegistrationDetailsRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
  },
  iconContainer: {
    padding: 6,
    backgroundColor: Colors.gray3,
    borderRadius: 8,
    marginRight: 8,
  },
  labelStyle: { fontFamily: "medium" },
  dataContainer: {
    width: "40%",
  },
  dataStyle: {
    color: Colors.gray,
    fontFamily: "regular",
  },
});
