import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../components/ui/AppBar";
import { Colors } from "../constants/styles";
import { ActivityIndicator } from "react-native-paper";
import Button from "../components/ui/Button";
import CustomSnackBar from "../components/ui/paper/CustomSnackBar";
import ImagePicker from "../components/ui/ImagePicker";
import useImage from "../util/hooks/useImage";
import { baseURL } from "../util/axios";
import CustomModal from "../components/ui/paper/CustomModal";
import { useReducer, useState } from "react";
import useSnackBar from "../util/hooks/useSnackBar";

const initialState = {
  isSuccess: false,
  submitted: false,
  loading: false,
  message: "",
};

const formSubmitReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_LOADING":
      return {
        ...state,
        submitted: true,
        loading: true,
        message: "",
      };
    case "SUCCESS":
      return {
        ...state,
        isSuccess: true,
        loading: false,
        message: action.message ? action.message : "",
      };
    case "FAILURE":
      return {
        ...state,
        isSuccess: false,
        loading: false,
        message: action.message,
      };
    default:
      return state;
  }
};

const UploadPhotoScreen = ({ navigation, route }) => {
  const [formState, dispatchFormState] = useReducer(
    formSubmitReducer,
    initialState
  );
  const { visible, onToggleSnackBar, onDismissSnackBar } = useSnackBar();
  const [modalStatus, setModalStatus] = useState({ visible: false, uri: "" });
  const showModal = (uri) =>
    setModalStatus((prevState) => ({ ...prevState, visible: true, uri: uri }));
  const hideModal = (uri) =>
    setModalStatus((prevState) => ({ ...prevState, visible: false, uri: uri }));

  const { studentId } = route.params;
  const photoImagePickerData = useImage(
    `${baseURL}/get-photo/${studentId}?random=${new Date().getTime()}`
  );
  const signImagePickerData = useImage(
    `${baseURL}/get-sign/${studentId}?random=${new Date().getTime()}`
  );

  let formIsValid = false;

  if (
    !photoImagePickerData.isValid &&
    !photoImagePickerData.uploadedImageHasError &&
    !signImagePickerData.isValid &&
    !signImagePickerData.uploadedImageHasError
  ) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const {
    value: photo,
    hasError: photoHasError,
    valueChangeHandler: photoChangeHandler,
    errorValueHandler: photoErrorHandler,
    uploadedImageHasError: uploadedPhotoHasErr,
  } = photoImagePickerData;

  const {
    value: sign,
    hasError: signHasError,
    valueChangeHandler: signChangeHandler,
    errorValueHandler: signErrorHandler,
    uploadedImageHasError: uploadedSignHasErr,
  } = signImagePickerData;

  const handleSubmit = async () => {
    dispatchFormState({
      type: "SUBMIT_LOADING",
    });

    dispatchFormState({
      type: "SUCCESS",
      message: "Data Submitted Successfully",
    });
    navigation.navigate("Checkout");
  };
  return (
    <SafeAreaView>
      <CustomModal
        visible={modalStatus.visible}
        pickedImage={modalStatus.uri}
        hideModal={hideModal}
      />
      <AppBar onPress={() => navigation.goBack()} title={"Upload Images"} />
      <View style={styles.container}>
        <Pressable
          android_ripple={{ color: Colors.shadowColor }}
          style={({ pressed }) => pressed && styles.pressedBtn}
          onPress={() => photo && showModal(photo)}
        >
          <ImagePicker
            style={[styles.inputContainer, { marginBottom: 40 }]}
            label={"Upload Photo"}
            lottieImageType={"pic"}
            pickedImage={photo}
            takeImageHandler={() =>
              photoChangeHandler(`upload-photo/?student_id=${studentId}`)
            }
            hasError={photoHasError}
            errorText={"Photo is required"}
            uploadedImageErr={uploadedPhotoHasErr}
            errorValueHandler={photoErrorHandler}
          />
        </Pressable>

        <Pressable
          android_ripple={{ color: Colors.shadowColor }}
          style={({ pressed }) => pressed && styles.pressedBtn}
          onPress={() => photo && showModal(sign)}
        >
          <ImagePicker
            style={[styles.inputContainer, { marginBottom: 40 }]}
            label={"Upload Sign"}
            lottieImageType={"sign"}
            pickedImage={sign}
            takeImageHandler={() =>
              signChangeHandler(`upload-sign/?student_id=${studentId}`)
            }
            hasError={signHasError}
            errorText={"Sign is required"}
            uploadedImageErr={uploadedSignHasErr}
            errorValueHandler={signErrorHandler}
          />
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <Button
          style={styles.btn}
          disabled={!formIsValid || formState.loading}
          onPress={handleSubmit}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {formState.submitted && formState.loading && (
              <ActivityIndicator animating={true} color={Colors.black} />
            )}
            <Text style={{ color: Colors.white, marginLeft: 10 }}>Submit</Text>
          </View>
        </Button>
        <CustomSnackBar
          onDismissSnackBar={onDismissSnackBar}
          visible={visible}
          message={formState.message}
          style={styles.snackBarStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default UploadPhotoScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingTop: 32,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: Platform.select({ android: "hidden" }),
  },
  btnContainer: {
    alignItems: "center",
    marginBottom: 70,
  },
  btn: {
    width: "30%",
  },
  pressedBtn: {
    opacity: 0.25,
  },
  snackBarStyle: {
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
  },
});
