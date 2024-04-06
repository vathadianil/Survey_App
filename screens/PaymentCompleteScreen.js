import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../components/ui/AppBar";
import Button from "../components/ui/Button";
import { AppContext } from "../store/app-context";
import axios, { baseURL } from "../util/axios";
import CustomImage from "../components/ui/CustomImage";
import useImage from "../util/hooks/useImage";
import PaymentForm from "../components/Student/PaymentForm";
import useInput from "../util/hooks/useInput";
import { Colors } from "../constants/styles";
import { ActivityIndicator } from "react-native-paper";
import useSnackBar from "../util/hooks/useSnackBar";
import CustomSnackBar from "../components/ui/paper/CustomSnackBar";
import { UPDATE_REGISTRATION_DETAILS } from "../util/apiRequests";

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

function validateText(text) {
  const isValid = !!String(text)?.trim();
  return isValid;
}

const PaymentCompleteScreen = ({ navigation }) => {
  const [formState, dispatchFormState] = useReducer(
    formSubmitReducer,
    initialState
  );
  const { width } = useWindowDimensions();
  const { studentData, loginData } = useContext(AppContext);
  const { visible, onToggleSnackBar, onDismissSnackBar } = useSnackBar();

  const { id } = studentData;
  const { agentId } = loginData;

  const qrImagePickerData = useImage(
    `${baseURL}/get-qr-photo/${agentId}?random=${new Date().getTime()}`
  );

  const paymentScreenshotImagePickerData = useImage(
    `${baseURL}/get-qr/${agentId}?random=${new Date().getTime()}`
  );
  const txnIdInputData = useInput("", validateText);
  const registrationFeeInputData = useInput("", validateText);

  let formIsValid = false;
  if (
    !paymentScreenshotImagePickerData.isValid &&
    !paymentScreenshotImagePickerData.uploadedImageHasError &&
    txnIdInputData.isValid &&
    registrationFeeInputData.isValid
  ) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const handleSubmit = async () => {
    try {
      let formValues = {
        regFee: +registrationFeeInputData.value,
        orderID: txnIdInputData.value,
        agentID: +agentId,
        studentID: +id,
      };

      dispatchFormState({
        type: "SUBMIT_LOADING",
      });
      const result = await axios.post(UPDATE_REGISTRATION_DETAILS, formValues);

      if (result?.data?.Registration_Fee_Status === "Yes") {
        dispatchFormState({
          type: "SUCCESS",
          message: "Registration Details Submitted Successfully",
        });
        onToggleSnackBar();
        navigation.navigate("RegistrationDetails", {
          registrationData: result.data,
        });
      } else {
        dispatchFormState({
          type: "FAILURE",
          message:
            "Something went wrong, Unable to Submit the Details. Please Try Again!",
        });
      }
      onToggleSnackBar();
    } catch (error) {
      console.log(error);
      dispatchFormState({
        type: "FAILURE",
        message:
          "Something went wrong, Unable to Submit the Details. Please Try Again!",
      });
      onToggleSnackBar();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <AppBar onPress={() => navigation.goBack()} title={"Scan QR"} />
      <ScrollView style={styles.container}>
        <View style={styles.qrContainer}>
          <CustomImage
            hasError={qrImagePickerData.hasError}
            pickedImage={qrImagePickerData.value}
            errorValueHandler={qrImagePickerData.errorValueHandler}
            source={require(`../assets/lottie-animations/Oops.json`)}
            style={{
              height: width - 100,
            }}
            loop={false}
          />
        </View>
        <View style={styles.formContainer}>
          <PaymentForm
            paymentScreenshotImagePickerData={paymentScreenshotImagePickerData}
            txnIdInputData={txnIdInputData}
            registrationFeeInputData={registrationFeeInputData}
            studentId={id}
            agentId={agentId}
          />
          <Button
            onPress={handleSubmit}
            style={styles.btn}
            disabled={!formIsValid || formState.loading}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {formState.submitted && formState.loading && (
                <ActivityIndicator
                  animating={true}
                  color={Colors.black}
                  style={{ marginRight: 10 }}
                />
              )}
              <Text style={{ color: Colors.white }}>Submit</Text>
            </View>
          </Button>
          <CustomSnackBar
            onDismissSnackBar={onDismissSnackBar}
            visible={visible}
            message={formState.message}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentCompleteScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.shadowColor,
    paddingHorizontal: 32,
  },
  qrContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 26,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },

  formContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
  },
  btn: {
    width: "30%",
  },
});
