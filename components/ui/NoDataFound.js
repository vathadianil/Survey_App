import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NoDataFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Data Found!!!</Text>
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "semibold",
    fontSize: 32,
  },
});
