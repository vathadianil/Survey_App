import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import LottieView from "lottie-react-native";
import RegistrationDetailsRow from "../components/Student/RegistrationDetailsRow";
import { useEffect, useState } from "react";
import axios from "../util/axios";
import CustomSnackBar from "../components/ui/paper/CustomSnackBar";
import useSnackBar from "../util/hooks/useSnackBar";
import { POST_SMS } from "../util/apiRequests";

const convertDateToString = (date) => {
  const day = date?.getDate();
  const month = date?.getMonth() + 1;
  const year = date?.getFullYear();
  return `${day}/${month}/${year}`;
};

const RegistrationDetailsScreen = ({ navigation, route }) => {
  const { visible, onToggleSnackBar, onDismissSnackBar } = useSnackBar();
  const [message, setMessage] = useState();
  const { registrationData } = route.params;
  const {
    Payment_Order_Id,
    Registration_Date,
    Registration_Fee,
    Student_Reg_No,
    Registration_Fee_Receipt,
  } = registrationData;
  const orderId = `XXXXXX${Payment_Order_Id}`;

  const sendSms = async () => {
    try {
      const body = `Registration Successful! 🎉\nReg No: ${Student_Reg_No}\nReg Dt: ${convertDateToString(
        new Date(Registration_Date)
      )}\nOrder ID: ${orderId}\nReceipt: ${Registration_Fee_Receipt}\nFee: ${Registration_Fee}`;
      const to = `+919985225558`;
      // const to = `+918074747801`;
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
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.imageContainer}>
              <LottieView
                style={styles.image}
                source={require(`../assets/lottie-animations/payment-success.json`)}
                autoPlay
                loop={true}
              />
            </View>
            <Text style={styles.infoText}>Registration Successful</Text>
            {Student_Reg_No && (
              <RegistrationDetailsRow
                label={"Registration No"}
                data={Student_Reg_No}
              />
            )}
            {Registration_Date && (
              <RegistrationDetailsRow
                label={"Registration Date"}
                data={convertDateToString(new Date(Registration_Date))}
              />
            )}

            {Payment_Order_Id && (
              <RegistrationDetailsRow label={"Order Id"} data={orderId} />
            )}

            {Registration_Fee_Receipt && (
              <RegistrationDetailsRow
                label={"Receipt No"}
                data={Registration_Fee_Receipt}
              />
            )}

            {Registration_Fee && (
              <RegistrationDetailsRow
                label={"Amount Paid"}
                data={Registration_Fee}
              />
            )}

            <View style={styles.btnContainer}>
              <Pressable
                android_ripple={{ color: Colors.shadowColor }}
                style={({ pressed }) => pressed && styles.pressedBtn}
                onPress={() =>
                  navigation.navigate("Home", {
                    submittedTimeStamp: new Date().getTime(),
                  })
                }
              >
                <View style={[styles.btnInnerContainer, styles.shadow]}>
                  <Ionicons
                    name={"home-outline"}
                    size={24}
                    color={Colors.white}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },

  infoText: {
    fontFamily: "semibold",
    fontSize: 20,
    textTransform: "capitalize",
    marginBottom: 32,
  },
  innerContainer: { alignItems: "center" },
  imageContainer: {
    width: 200,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
  },

  btnContainer: {
    marginTop: 32,
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 4,
  },
  btnInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary800,
  },
  pressedBtn: { opacity: 0.25 },
});
