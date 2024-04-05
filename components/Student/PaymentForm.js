import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/styles";
import ImagePicker from "../ui/ImagePicker";
import CustomModal from "../ui/paper/CustomModal";
import CustomInput from "../ui/paper/CustomInput";

const PaymentForm = ({
  paymentScreenshotImagePickerData,
  txnIdInputData,
  registrationFeeInputData,
  studentId,
  agentId,
}) => {
  const [modalStatus, setModalStatus] = useState({ visible: false, uri: "" });
  const showModal = (uri) =>
    setModalStatus((prevState) => ({ ...prevState, visible: true, uri: uri }));
  const hideModal = (uri) =>
    setModalStatus((prevState) => ({ ...prevState, visible: false, uri: uri }));

  const {
    value: paymentScreenshot,
    hasError: paymentScreenshotHasError,
    valueChangeHandler: paymentScreenshotChangeHandler,
    errorValueHandler: paymentScreenshotErrorHandler,
    uploadedImageHasError: uploadedpaymentScreenshotHasErr,
  } = paymentScreenshotImagePickerData;

  const {
    value: txnId,
    hasError: txnIdHasError,
    valueChangeHandler: txnIdChangeHandler,
    inputBlurHandler: txnIdBlurHandler,
  } = txnIdInputData;

  const {
    value: registrationFee,
    hasError: registrationFeeHasError,
    valueChangeHandler: registrationFeeChangeHandler,
    inputBlurHandler: registrationFeeBlurHandler,
  } = registrationFeeInputData;

  return (
    <View>
      <CustomModal
        visible={modalStatus.visible}
        pickedImage={modalStatus.uri}
        hideModal={hideModal}
      />

      <Pressable
        android_ripple={{ color: Colors.shadowColor }}
        style={({ pressed }) => pressed && styles.pressedBtn}
        onPress={() =>
          paymentScreenshot &&
          !paymentScreenshotHasError &&
          showModal(paymentScreenshot)
        }
      >
        <ImagePicker
          style={[styles.inputContainer]}
          label={"Receipt"}
          lottieImageType={"receipt"}
          pickedImage={paymentScreenshot}
          takeImageHandler={() =>
            paymentScreenshotChangeHandler(
              `upload-paymentreceipt-photo/?student_id=${studentId}&agent_id=${agentId}`
            )
          }
          hasError={paymentScreenshotHasError}
          errorText={"Receipt is required"}
          uploadedImageErr={uploadedpaymentScreenshotHasErr}
          errorValueHandler={paymentScreenshotErrorHandler}
        />
      </Pressable>
      <CustomInput
        label={"Last 6 Digits of Txn Id*"}
        errorText={"Transaction Id is Required"}
        style={styles.inputContainer}
        value={txnId}
        onValueChange={txnIdChangeHandler}
        onBlurHanlder={txnIdBlurHandler}
        hasError={txnIdHasError}
      />
      <CustomInput
        label={"Paid Amount*"}
        errorText={"Amount is Required"}
        style={styles.inputContainer}
        numberkeyBoard={true}
        value={registrationFee}
        onValueChange={registrationFeeChangeHandler}
        onBlurHanlder={registrationFeeBlurHandler}
        hasError={registrationFeeHasError}
      />
    </View>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({});
