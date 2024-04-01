import { Pressable, StyleSheet, Text, View } from "react-native";
import { Linking } from "react-native";
import { AppContext } from "../../store/app-context";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

import StudentRow from "./StudentRow";
import CustomImage from "../ui/CustomImage";
import useImage from "../../util/hooks/useImage";
import { baseURL } from "../../util/axios";

const StudentPersonalDetails = () => {
  const { studentData } = useContext(AppContext);
  console.log({ studentData });

  const {
    id,
    studentName,
    gender,
    mobileNumber,
    alternateMNo,
    fatherMobileNumber,
    permanentAddress,
    fatherName,
    fOccupation,
    motherName,
    mOccupation,
    motherTounge,
    dob,
    religion,
    caste,
    subCaste,
    aadharNo,
    disability,
  } = studentData;

  const photoImagePickerData = useImage(
    `${baseURL}/get-photo/${id}?random=${new Date().getTime()}`
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
        <CustomImage
          hasError={photoImagePickerData.hasError}
          pickedImage={photoImagePickerData.value}
          errorValueHandler={photoImagePickerData.errorValueHandler}
          source={
            gender === "Female"
              ? require(`../../assets/lottie-animations/female1.json`)
              : require(`../../assets/lottie-animations/male1.json`)
          }
          style={{
            borderRadius: 75,
            marginVertical: 12,
            backgroundColor: Colors.white,
          }}
          loop={false}
        />
        <Text style={styles.studentName}>{studentName}</Text>
        <View>
          <Pressable
            android_ripple={{ color: Colors.shadowColor }}
            style={[
              ({ pressed }) => pressed && styles.pressedBtn,
              styles.textContainer,
            ]}
            onPress={phoneNumberPressHndlr.bind(this, mobileNumber)}
            // style={styles.textContainer}
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
          {alternateMNo && (
            <Pressable
              android_ripple={{ color: Colors.shadowColor }}
              style={[
                ({ pressed }) => pressed && styles.pressedBtn,
                styles.textContainer,
              ]}
              onPress={phoneNumberPressHndlr.bind(this, alternateMNo)}
            >
              <Ionicons
                name="call"
                size={12}
                color={Colors.primary800}
                style={styles.icon}
              />
              <Text style={[styles.detailText, styles.mobileText]}>
                {alternateMNo ? alternateMNo : "Not Available"}
              </Text>
              <Text style={[styles.detailText]}> (Alternate)</Text>
            </Pressable>
          )}
          {fatherMobileNumber && (
            <Pressable
              android_ripple={{ color: Colors.shadowColor }}
              style={[
                ({ pressed }) => pressed && styles.pressedBtn,
                styles.textContainer,
              ]}
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
          icon={"man-outline"}
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
          icon={"woman-outline"}
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
      {gender && (
        <StudentRow
          label={"Gender"}
          data={gender}
          icon={gender.toLowerCase() === "male" ? "male" : "female"}
          type={"ionicons"}
        />
      )}
      {dob && (
        <StudentRow
          label={"Date Of Birth"}
          data={dob}
          icon={"calendar-outline"}
          type={"ionicons"}
        />
      )}
      {motherTounge && (
        <StudentRow
          label={"Mother Tongue"}
          data={motherTounge}
          icon={"language-outline"}
          type={"ionicons"}
        />
      )}
      {religion && (
        <StudentRow
          label={"Religion"}
          data={religion}
          icon={"book-outline"}
          type={"ionicons"}
        />
      )}
      {caste && (
        <StudentRow
          label={"Caste"}
          data={caste}
          icon={"cog-outline"}
          type={"ionicons"}
        />
      )}
      {subCaste && (
        <StudentRow
          label={"Sub Caste"}
          data={subCaste}
          icon={"bookmark-outline"}
          type={"ionicons"}
        />
      )}
      {aadharNo && (
        <StudentRow
          label={"Aadhar Number"}
          data={aadharNo}
          icon={"card-outline"}
          type={"ionicons"}
        />
      )}
      {disability && (
        <StudentRow
          label={"Physically Disabled"}
          data={disability}
          icon={"walk-outline"}
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
    marginVertical: 16,
    marginHorizontal: 16,
    marginBottom: 100,
    // paddingHorizontal: 4,
    paddingBottom: 32,
    borderRadius: 8,
    // overflow: "hidden",
    backgroundColor: Colors.white,
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
  pressedBtn: { opacity: 0.25 },
});
