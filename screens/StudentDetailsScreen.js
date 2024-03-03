import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { DUMMY_DATA } from "../data/dummy-data";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { Linking } from "react-native";

const StudentDetailsScreen = ({ route }) => {
  const { studentId } = route.params;
  const selectedStudent = DUMMY_DATA.find(
    (student) => student.id === studentId
  );

  async function phoneNumberPressHndlr(mobileNumber) {
    const isSupported = await Linking.canOpenURL(`tel:${mobileNumber}`);
    if (isSupported) {
      Linking.openURL(`tel:${mobileNumber}`);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <LottieView
            style={styles.image}
            source={
              selectedStudent.gender === "Female"
                ? require(`../assets/lottie-animations/female1.json`)
                : require(`../assets/lottie-animations/male1.json`)
            }
            autoPlay
            loop={false}
          />
        </View>

        <Text style={styles.studentName}>{selectedStudent.studentName}</Text>
        <View>
          <Pressable
            onPress={phoneNumberPressHndlr.bind(
              this,
              selectedStudent.mobileNumber
            )}
            style={styles.detailContainer}
          >
            <Ionicons
              name="call"
              size={12}
              color={Colors.primary800}
              style={styles.icon}
            />
            <Text style={[styles.detailText, styles.mobileText]}>
              {selectedStudent?.mobileNumber
                ? selectedStudent?.mobileNumber
                : "Not Available"}
            </Text>
          </Pressable>
          <Pressable
            style={styles.detailContainer}
            onPress={phoneNumberPressHndlr.bind(
              this,
              selectedStudent.fatherMobileNumber
            )}
          >
            <Ionicons
              name="call"
              size={12}
              color={Colors.primary800}
              style={styles.icon}
            />
            <Text style={[styles.detailText, styles.mobileText]}>
              {selectedStudent?.fatherMobileNumber
                ? `${selectedStudent?.fatherMobileNumber} `
                : "Not Available"}
            </Text>
            {selectedStudent?.fatherMobileNumber && (
              <Text style={[styles.detailText]}>(Guardian)</Text>
            )}
          </Pressable>
        </View>
      </View>
      <View style={[styles.detailContainer, styles.locationContainer]}>
        <Ionicons name="location" size={12} style={styles.icon} />
        <Text style={[styles.detailText]}>
          {selectedStudent.permanentAddress}
        </Text>
      </View>
    </View>
  );
};

export default StudentDetailsScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 16,
    paddingHorizontal: 4,
    paddingBottom: 16,
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
  innerContainer: { alignItems: "center" },
  imageContainer: {
    height: 150,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
  },
  studentName: {
    fontFamily: "semibold",
    fontSize: 20,
    marginBottom: 8,
    textTransform: "capitalize",
    flexWrap: "wrap",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  mobileText: {
    color: Colors.primary800,
    textDecorationLine: "underline",
    fontFamily: "semibold",
  },
  icon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: "medium",
    textTransform: "capitalize",
  },
  locationContainer: {
    marginHorizontal: 8,
    padding: 16,
    textAlign: "center",
    borderWidth: 1,
    borderColor: Colors.error100,
    borderRadius: 6,
  },
});
