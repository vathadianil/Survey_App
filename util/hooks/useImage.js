import { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Alert } from "react-native";

const useImage = (initialValue, validateValue) => {
  const [pickedImage, setPickedImage] = useState(initialValue);
  const [camerPermissionInfo, requestPermission] = useCameraPermissions();
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(pickedImage.base64Image);
  const hasError = !valueIsValid && isTouched;

  const verifyPermission = async () => {
    if (camerPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (camerPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to Grant camera permission to use this App"
      );
      return false;
    }
    return true;
  };

  const valueChangeHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      base64: true,
    });

    setPickedImage(image?.assets[0]?.uri);
    inputBlurHandler();
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setPickedImage("");
    setIsTouched(false);
  };

  return {
    value: pickedImage,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useImage;
