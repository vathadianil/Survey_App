import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import RegistrationDetailsRow from "./RegistrationDetailsRow";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import useDate from "../../util/hooks/useDate";
import { useNavigation } from "@react-navigation/native";

const StudentRegistrationDetails = ({
  orderId,
  registrationDate,
  registrationFee,
  studentRegistrationNo,
  registrationFeeReceipt,
}) => {
  const navigation = useNavigation();
  const { convertDateToString } = useDate();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <LottieView
            style={styles.image}
            source={require(`../../assets/lottie-animations/payment-success.json`)}
            autoPlay
            loop={true}
          />
        </View>
        <Text style={styles.infoText}>Registration Successful</Text>
        {studentRegistrationNo && (
          <RegistrationDetailsRow
            label={"Registration No"}
            data={studentRegistrationNo}
          />
        )}
        {registrationDate && (
          <RegistrationDetailsRow
            label={"Registration Date"}
            data={convertDateToString(new Date(registrationDate))}
          />
        )}

        {orderId && (
          <RegistrationDetailsRow label={"Order Id"} data={orderId} />
        )}

        {registrationFeeReceipt && (
          <RegistrationDetailsRow
            label={"Receipt No"}
            data={registrationFeeReceipt}
          />
        )}

        {registrationFee && (
          <RegistrationDetailsRow
            label={"Amount Paid"}
            data={registrationFee}
          />
        )}

        <View style={styles.btnContainer}>
          <Pressable
            android_ripple={{ color: Colors.shadowColor }}
            style={({ pressed }) => pressed && styles.pressedBtn}
            onPress={() => {
              navigation.navigate("Home", {
                submittedTimeStamp: new Date().getTime(),
              });
            }}
          >
            <View style={styles.innerBtnContainer}>
              <Ionicons name="home-outline" size={17} color={Colors.white} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default StudentRegistrationDetails;

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
    justifyContent: "center",
    alignItems: "center",
    overflow: Platform.select({ android: "hidden" }),
  },
  innerBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  pressedBtn: {
    opacity: 0.25,
  },
});
