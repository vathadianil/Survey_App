import { Image, Platform, StyleSheet, View } from "react-native";
import Button from "./Button";
import { Colors } from "react-native/Libraries/NewAppScreen";
import LottieView from "lottie-react-native";
import { HelperText } from "react-native-paper";

const ImagePicker = ({
  style,
  label,
  lottieImageType,
  pickedImage,
  takeImageHandler,
  hasError,
  errorText,
}) => {
  let imagePreview = (
    <LottieView
      style={styles.image}
      source={
        (lottieImageType === "pic" &&
          require(`../../assets/lottie-animations/image-preview.json`)) ||
        (lottieImageType === "sign" &&
          require(`../../assets/lottie-animations/sign-preview.json`))
      }
      autoPlay
    />
  );
  if (pickedImage && !hasError) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerContainer}>
        <View style={styles.imagePreview}>{imagePreview}</View>
        <Button onPress={takeImageHandler} icon={"camera-outline"}>
          {label}
        </Button>
      </View>
      <HelperText type="error" visible={hasError}>
        {errorText}
      </HelperText>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imagePreview: {
    width: "50%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.white,
    elevation: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: Platform.select({ android: "hidden" }),
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
