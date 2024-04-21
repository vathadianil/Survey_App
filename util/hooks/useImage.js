import { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import axios from "../axios";

const useImage = (initialValue) => {
  const [pickedImage, setPickedImage] = useState(initialValue);
  const [hasError, setHasError] = useState(false);
  const [uploadedImageHasError, setUploadedImageHasError] = useState(false);
  const [camerPermissionInfo, requestPermission] = useCameraPermissions();
  const valueIsValid = hasError;

  const verifyPermission = async () => {
    if (camerPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    // if (camerPermissionInfo.status === PermissionStatus.DENIED) {
    //   Alert.alert(
    //     "Insufficient Permission!",
    //     "You need to Grant camera permission to use this App"
    //   );
    //   return false;
    // }
    return true;
  };

  const valueChangeHandler = async (url) => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image?.assets[0]?.uri);
    errorValueHandler(false);
    uploadImage(image?.assets[0]?.uri, url);
  };

  const errorValueHandler = (value) => {
    setHasError(value);
  };

  async function uploadImage(imageUrl, url) {
    try {
      const fileName = imageUrl?.split("/").pop();
      const fileType = fileName.split(".").pop();
      const formData = new FormData();
      formData.append("photo", {
        uri: imageUrl,
        name: fileName,
        type: `image/${fileType}`,
      });
      const { data } = await axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.returnCode === 1 && data.returnMessage === "Success") {
        setUploadedImageHasError(false);
      } else {
        setUploadedImageHasError(true);
      }
    } catch (error) {
      console.log({ error });
      setUploadedImageHasError(true);
    }
  }

  const reset = () => {
    setPickedImage("");
    setIsTouched(false);
  };

  return {
    value: pickedImage,
    isValid: valueIsValid,
    hasError,
    uploadedImageHasError,
    errorValueHandler,
    valueChangeHandler,
    reset,
  };
};

export default useImage;
