import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import StudentRow from "./StudentRow";
// import usePdf from "../../util/hooks/usePdf";

const StudentRegistrationDetails = ({
  orderId,
  registrationDate,
  registrationFee,
  studentRegistrationNo,
  registrationFeeReceipt,
  isRegistrationPage = false,
}) => {
  const navigation = useNavigation();
  // const { sharePdf } = usePdf();
  return (
    <View style={styles.container}>
      {!isRegistrationPage && (
        <Text style={styles.title}>Registration Details</Text>
      )}
      <View style={styles.innerContainer}>
        {isRegistrationPage && (
          <View style={styles.imageContainer}>
            <LottieView
              style={styles.image}
              source={require(`../../assets/lottie-animations/payment-success.json`)}
              autoPlay
              loop={true}
            />
          </View>
        )}
        {isRegistrationPage && (
          <Text style={styles.infoText}>Registration Successful</Text>
        )}

        {studentRegistrationNo && (
          <StudentRow
            label={"Registration No"}
            data={studentRegistrationNo}
            icon={"ticket-outline"}
            type={"ionicons"}
          />
        )}

        {registrationDate && (
          <StudentRow
            label={"Registration Date"}
            data={registrationDate}
            icon={"calendar-number-outline"}
            type={"ionicons"}
          />
        )}

        {orderId && (
          <StudentRow
            label={"Order Id"}
            data={orderId}
            icon={"bag-check-outline"}
            type={"ionicons"}
          />
        )}

        {registrationFeeReceipt && (
          <StudentRow
            label={"Receipt No"}
            data={registrationFeeReceipt}
            icon={"receipt-outline"}
            type={"ionicons"}
          />
        )}

        {registrationFee && (
          <StudentRow
            label={"Amount Paid"}
            data={registrationFee}
            icon={"cash-outline"}
            type={"ionicons"}
          />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          {isRegistrationPage && (
            <View style={[styles.btnContainer, { marginRight: 20 }]}>
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
                  <Ionicons
                    name="home-outline"
                    size={17}
                    color={Colors.white}
                  />
                </View>
              </Pressable>
            </View>
          )}
          <View style={[styles.btnContainer]}>
            <Pressable
              android_ripple={{ color: Colors.shadowColor }}
              style={({ pressed }) => pressed && styles.pressedBtn}
              onPress={() => {
                // sharePdf();
              }}
            >
              <View style={styles.innerBtnContainer}>
                <Ionicons
                  name="share-social-outline"
                  size={17}
                  color={Colors.white}
                />
              </View>
            </Pressable>
          </View>
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
  title: {
    paddingHorizontal: 16,
    paddingTop: 16,
    fontSize: 18,
    fontFamily: "semibold",
    color: Colors.gray,
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
