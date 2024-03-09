import { StyleSheet, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const NoDataFound = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <LottieView
          style={styles.image}
          source={require(`../../assets/lottie-animations/Oops.json`)}
          autoPlay
          loop={false}
        />
      </View>
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
  imageContainer: {
    width: "90%",
    aspectRatio: 1,
  },
  image: {
    flex: 1,
  },
});
