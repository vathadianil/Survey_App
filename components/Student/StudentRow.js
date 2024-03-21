import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

const StudentRow = ({ label, data, icon, type }) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {icon && type === "ionicons" && (
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={12} />
          </View>
        )}

        <Text style={styles.labelStyle}>{label}</Text>
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.dataStyle}>{data}</Text>
      </View>
    </View>
  );
};

export default StudentRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 22,
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
