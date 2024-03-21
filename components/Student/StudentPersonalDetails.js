import { Pressable, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { Linking } from "react-native";
import { AppContext } from "../../store/app-context";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

import StudentRow from "./StudentRow";

const StudentPersonalDetails = () => {
  const { studentData } = useContext(AppContext);

  const {
    studentName,
    gender,
    mobileNumber,
    fatherMobileNumber,
    permanentAddress,
    fatherName,
    fOccupation,
    motherName,
    mOccupation,
  } = studentData;

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
              gender === "Female"
                ? require(`../../assets/lottie-animations/female1.json`)
                : require(`../../assets/lottie-animations/male1.json`)
            }
            autoPlay
            loop={false}
          />
        </View>
        <Text style={styles.studentName}>{studentName}</Text>
        <View>
          <Pressable
            onPress={phoneNumberPressHndlr.bind(this, mobileNumber)}
            style={styles.textContainer}
          >
            <Ionicons
              name="call"
              size={12}
              color={Colors.primary800}
              style={styles.icon}
            />
            <Text style={[styles.detailText, styles.mobileText]}>
              {mobileNumber ? mobileNumber : "Not Available"}
            </Text>
          </Pressable>
          {fatherMobileNumber && (
            <Pressable
              style={styles.textContainer}
              onPress={phoneNumberPressHndlr.bind(this, fatherMobileNumber)}
            >
              <Ionicons
                name="call"
                size={12}
                color={Colors.primary800}
                style={styles.icon}
              />
              <Text style={[styles.detailText, styles.mobileText]}>
                {fatherMobileNumber}
              </Text>

              <Text style={[styles.detailText]}> (Guardian)</Text>
            </Pressable>
          )}
        </View>
      </View>
      <View style={[styles.textContainer, styles.locationContainer]}>
        <Ionicons name="location" size={12} style={styles.icon} />
        <Text style={[styles.detailText]}>{permanentAddress}</Text>
      </View>

      {fatherName && (
        <StudentRow
          label={"Father Name"}
          data={fatherName}
          icon={"male"}
          type={"ionicons"}
        />
      )}
      {fOccupation && (
        <StudentRow
          label={"Father Occupation"}
          data={fOccupation}
          icon={"briefcase-outline"}
          type={"ionicons"}
        />
      )}
      {motherName && (
        <StudentRow
          label={"Mother Name"}
          data={motherName}
          icon={"female"}
          type={"ionicons"}
        />
      )}
      {mOccupation && (
        <StudentRow
          label={"Mother Occupation"}
          data={mOccupation}
          icon={"briefcase-outline"}
          type={"ionicons"}
        />
      )}
    </View>
  );
};

export default StudentPersonalDetails;

const styles = StyleSheet.create({
  studentName: {
    fontFamily: "semibold",
    fontSize: 16,
    textTransform: "capitalize",
    marginBottom: 8,
  },
  container: {
    // marginVertical: 16,
    marginHorizontal: 16,
    // paddingHorizontal: 4,
    // paddingBottom: 16,
    // borderRadius: 8,
    // overflow: "hidden",
    // backgroundColor: Colors.white,
    // elevation: 4,
    // shadowColor: Colors.black,
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.25,
    // shadowRadius: 8,
    // overflow: Platform.select({ android: "hidden" }),
  },

  innerContainer: { alignItems: "center" },
  imageContainer: {
    height: 150,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
  },

  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
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
    color: Colors.gray,
  },
  locationContainer: {
    marginHorizontal: 8,
    padding: 16,
    textAlign: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
    borderRadius: 6,
  },
});
