import { Image, Platform, StyleSheet, View } from "react-native";
import Button from "./Button";
import LottieView from "lottie-react-native";
import { HelperText } from "react-native-paper";
import { Colors } from "../../constants/styles";

const ImagePicker = ({
  style,
  label,
  lottieImageType,
  pickedImage,
  takeImageHandler,
  hasError,
  errorText,
  uploadedImageErr,
  errorValueHandler,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerContainer}>
        <View style={styles.imagePreview}>
          {hasError ? (
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
          ) : (
            <Image
              style={styles.image}
              source={{ uri: pickedImage, cache: "reload" }}
              onError={() => errorValueHandler(true)}
            />
          )}
        </View>
        <Button
          style={{
            backgroundColor: hasError
              ? Colors.primary800
              : uploadedImageErr
              ? Colors.error800
              : Colors.success,
          }}
          onPress={takeImageHandler}
          icon={
            hasError
              ? "camera-outline"
              : uploadedImageErr
              ? "close-circle-outline"
              : "checkmark-circle-outline"
          }
          size={18}
        >
          {hasError ? label : uploadedImageErr ? "Try Again" : "Retake"}
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
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
