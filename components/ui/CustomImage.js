import { Image, Platform, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import LottieView from "lottie-react-native";
import { Card } from "react-native-paper";
import { Colors } from "../../constants/styles";

const CustomImage = ({
  hasError,
  source,
  pickedImage,
  errorValueHandler,
  style,
  loop = true,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Card mode="elevated" style={[styles.imagePreview, style]}>
      {loading && (
        <View style={styles.loadingContainer}>
          <LoadingOverlay />
        </View>
      )}
      {hasError ? (
        <LottieView style={styles.image} source={source} autoPlay loop={loop} />
      ) : (
        <Image
          style={styles.image}
          source={{ uri: pickedImage, cache: "reload" }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            errorValueHandler(true);
            setLoading(false);
          }}
        />
      )}
    </Card>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  imagePreview: {
    height: 150,
    aspectRatio: 1,
    overflow: Platform.select({ android: "hidden" }),
    borderWidth: 4,
    borderColor: Colors.white,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
