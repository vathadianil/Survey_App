import { Platform, StyleSheet, View } from "react-native";
import Button from "./Button";
import { HelperText } from "react-native-paper";
import { Colors } from "../../constants/styles";
import CustomImage from "./CustomImage";

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
        <CustomImage
          hasError={hasError}
          pickedImage={pickedImage}
          errorValueHandler={errorValueHandler}
          source={
            (lottieImageType === "pic" &&
              require(`../../assets/lottie-animations/image-preview.json`)) ||
            (lottieImageType === "sign" &&
              require(`../../assets/lottie-animations/sign-preview.json`))
          }
          style={{ marginRight: 10 }}
        />

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
});
