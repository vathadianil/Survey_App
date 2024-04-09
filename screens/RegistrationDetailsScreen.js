import { Alert, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from "../util/axios";
import CustomSnackBar from "../components/ui/paper/CustomSnackBar";
import useSnackBar from "../util/hooks/useSnackBar";
import { POST_SMS } from "../util/apiRequests";
import StudentRegistrationDetails from "../components/Student/StudentRegistrationDetails";
import useDate from "../util/hooks/useDate";

const RegistrationDetailsScreen = ({ navigation, route }) => {
  const { visible, onToggleSnackBar, onDismissSnackBar } = useSnackBar();
  const [message, setMessage] = useState();
  const { convertDateToString } = useDate();
  const { registrationData } = route.params;
  const {
    Payment_Order_Id: paymentOrderId,
    Registration_Date: registrationDate,
    Registration_Fee: registrationFee,
    Student_Reg_No: studentRegistrationNo,
    Registration_Fee_Receipt: registrationFeeReceipt,
  } = registrationData;
  const orderId = paymentOrderId ? `XXXXXX${paymentOrderId}` : "";
  const regDate = convertDateToString(new Date(registrationDate));
  const regFee = `\u20B9 ${registrationFee}/-`;

  const sendSms = async () => {
    try {
      const body = `Registration Successful! 🎉\nReg No: ${studentRegistrationNo}\nReg Dt: ${regDate}\nOrder ID: ${orderId}\nReceipt: ${registrationFeeReceipt}\nFee: ${registrationFee}`;
      // const to = `+919985225558`;
      const to = `+918074747801`;
      const { data } = await axios.post(POST_SMS, { to, body });
      if (data?.sid) {
        setMessage(data?.message);
        onToggleSnackBar();
      } else {
        setMessage("SMS not sent sucessfully");
        onToggleSnackBar();
      }
    } catch (error) {
      console.log(error);
      setMessage("SMS sending Failed");
      onToggleSnackBar();
    }
  };

  useEffect(() => {
    sendSms();
  }, []);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          "You Can't Go Back?",
          "You will be redirected Home. Are you sure to Continue?",
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Yes",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () =>
                navigation.navigate("Home", {
                  submittedTimeStamp: new Date().getTime(),
                }),
            },
          ]
        );
      }),
    [navigation]
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <StudentRegistrationDetails
          orderId={orderId}
          registrationDate={regDate}
          registrationFee={regFee}
          registrationFeeReceipt={registrationFeeReceipt}
          studentRegistrationNo={studentRegistrationNo}
          isRegistrationPage={true}
        />
        <CustomSnackBar
          onDismissSnackBar={onDismissSnackBar}
          visible={visible}
          message={message}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationDetailsScreen;

const styles = StyleSheet.create({});
