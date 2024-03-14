import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../constants/styles";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// imageHeight:100
// padding:16
// paddingVertical:32
// marginBottom:16

const ITEM_SIZE = 164;

const StudentOverview = ({
  id,
  studentName,
  gender,
  mobileNumber,
  fatherMobileNumber,
  permanentAddress,
  visitedStatus,
  insterestedStatus,
  tokenAmount,
  index,
  scrollY,
}) => {
  const navigation = useNavigation();
  const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0],
  });

  return (
    <Animated.View style={[styles.student, { transform: [{ scale }] }]}>
      <View style={styles.statusContainer}>
        <Text style={styles.stutusText}>
          {visitedStatus === "NO" ? "Not Visited" : "Visited"}
        </Text>
        <View
          style={[
            styles.statusIndicator,
            visitedStatus === "NO"
              ? { backgroundColor: Colors.error800 }
              : { backgroundColor: Colors.success },
          ]}
        ></View>
      </View>
      <Pressable
        android_ripple={{ color: Colors.shadowColor }}
        style={({ pressed }) => pressed && styles.pressedBtn}
        onPress={() => {
          navigation.navigate("StudentDetail", {
            id: id,
            studentName: studentName,
            gender: gender,
            mobileNumber: mobileNumber,
            fatherMobileNumber: fatherMobileNumber,
            permanentAddress: permanentAddress,
            visitedStatus: visitedStatus,
            insterestedStatus: insterestedStatus,
            tokenAmount: tokenAmount,
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
    </Animated.View>
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

  pressedBtn: {
    opacity: 0.25,
  },
});
