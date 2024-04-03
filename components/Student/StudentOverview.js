import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AppContext } from "../../store/app-context";
import { baseURL } from "../../util/axios";
import useImage from "../../util/hooks/useImage";
import CustomImage from "../ui/CustomImage";

const StudentOverview = ({ studentData }) => {
  const {
    id,
    gender,
    mobileNumber,
    permanentAddress,
    studentName,
    school,
    visitedStatus,
  } = studentData;
  const navigation = useNavigation();
  const appCtx = useContext(AppContext);
  const photoImagePickerData = useImage(
    `${baseURL}/get-photo/${id}?random=${new Date().getTime()}`
  );
  return (
    <View style={[styles.student]}>
      <View style={styles.statusContainer}>
        <Text style={styles.stutusText}>
          {visitedStatus === "NO" || !visitedStatus ? "Not Visited" : "Visited"}
        </Text>

        <View
          style={[
            styles.statusIndicator,
            visitedStatus === "NO" || !visitedStatus
              ? { backgroundColor: Colors.error800 }
              : { backgroundColor: Colors.success },
          ]}
        ></View>
      </View>
      <Pressable
        android_ripple={{ color: Colors.shadowColor }}
        style={({ pressed }) => pressed && styles.pressedBtn}
        onPress={() => {
          appCtx.addStudentData(studentData);
          navigation.navigate("StudentDetail");
        }}
      >
        <View style={[styles.innerContainer]}>
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
              height: 70,
              borderRadius: 35,
              backgroundColor: Colors.white,
              margin: 10,
            }}
            loop={false}
          />
          <View>
            <View style={styles.studentNameContainer}>
              <Text style={styles.studentName}>{studentName}</Text>
            </View>

            <View style={styles.detailContainer}>
              <Ionicons name="call" size={12} style={styles.icon} />
              <Text style={styles.detailText}>
                {mobileNumber ? mobileNumber : "Not Available"}
              </Text>
            </View>

            {school && (
              <View style={styles.detailContainer}>
                <Ionicons name="school" size={12} style={styles.icon} />
                <Text style={[styles.detailText, styles.schoolText]}>
                  {school}
                </Text>
              </View>
            )}

            <View style={styles.detailContainer}>
              <Ionicons name="location" size={12} style={styles.icon} />
              <Text style={styles.detailText}>
                {permanentAddress?.length > 25
                  ? permanentAddress?.slice(0, 25) + "..."
                  : permanentAddress}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default StudentOverview;

const styles = StyleSheet.create({
  student: {
    marginBottom: 16,
    paddingHorizontal: 4,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    overflow: Platform.select({ android: "hidden" }),
    position: "relative",
  },
  statusContainer: {
    position: "absolute",
    top: 2,
    right: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 4,
    elevation: 4,
    shadowColor: Colors.black,
    shadowRadius: 8,
  },
  stutusText: {
    fontSize: 10,
    fontFamily: "medium",
    textTransform: "uppercase",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },

  studentNameContainer: {
    flexDirection: "row",
  },
  studentName: {
    fontFamily: "medium",
    fontSize: 16,
    marginBottom: 8,
    textTransform: "capitalize",
    flex: 1,
    flexWrap: "wrap",
  },
  imageContainer: {
    height: 100,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  icon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: "light",
    textTransform: "capitalize",
  },
  schoolText: { textTransform: "uppercase" },
  pressedBtn: {
    opacity: 0.25,
  },
});
