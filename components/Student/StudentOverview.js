import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const StudentOverview = ({
  id,
  studentName,
  gender,
  mobileNumber,
  permanentAddress,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.student}>
      <Pressable
        android_ripple={{ color: Colors.shadowColor }}
        style={({ pressed }) => pressed && styles.pressedBtn}
        onPress={() => {
          navigation.navigate("StudentDetail", {
            studentId: id,
          });
        }}
      >
        <View style={[styles.innerContainer]}>
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
    marginVertical: 16,
    marginHorizontal: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: Platform.select({ android: "hidden" }),
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
    fontWeight: "bold",
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
    fontWeight: "700",
    textTransform: "capitalize",
  },

  pressedBtn: {
    opacity: 0.25,
  },
});
