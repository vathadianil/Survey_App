import { StyleSheet, View, Pressable, Text } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import Button from "../components/ui/Button";
import { Colors } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";

const ProfileScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Pressable
            android_ripple={{ color: Colors.shadowColor }}
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back-circle" size={30} />
          </Pressable>

          <Button
            onPress={() => {
              authCtx.logout();
            }}
            style={styles.btn}
          >
            Log out
          </Button>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.imageContainer}>
            <LottieView
              style={styles.image}
              source={require(`../assets/lottie-animations/male1.json`)}
              autoPlay
              loop={false}
            />
          </View>
          <Text style={styles.nameText}>Anil Kumar</Text>
          <Text style={styles.loginIdText}>Login ID : 1142</Text>
        </View>

        <View style={styles.analyticsContainer}>
          <Text style={styles.analyticsHeaderText}>Analytics</Text>
          <View style={styles.surveyProgressContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle-outline" size={24} />
            </View>

            <View style={styles.textWrapper}>
              <Text style={styles.text1}>2 of 4</Text>
              <Text style={styles.text2}>Completed Surveys</Text>
            </View>
            <View style={styles.progressIndicatorContainer}>
              <View style={{ width: "100%" }}>
                <ProgressBar
                  progress={0.5}
                  color={Colors.black}
                  style={{ borderRadius: 4 }}
                />
              </View>
              <Text style={[styles.text2, { marginTop: 10 }]}>50%</Text>
            </View>
          </View>
          <View style={styles.surveyProgressContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="star-outline" size={24} />
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.text1}>3</Text>
              <Text style={styles.text2}>Average Completion Rate</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 16,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  detailsContainer: {
    alignItems: "center",
  },

  imageContainer: {
    height: 150,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
  },
  btn: {
    backgroundColor: Colors.error800,
  },

  nameText: {
    fontFamily: "semibold",
    fontSize: 28,
  },
  loginIdText: {
    fontFamily: "medium",
    fontSize: 16,
    color: Colors.gray,
  },

  analyticsContainer: { marginTop: 16 },
  analyticsHeaderText: {
    fontFamily: "medium",
    fontSize: 20,
  },

  surveyProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  iconContainer: {
    padding: 16,
    backgroundColor: Colors.gray3,
    marginRight: 8,
    borderRadius: 8,
  },
  textWrapper: {
    marginRight: 32,
  },
  text1: {
    fontFamily: "semibold",
  },
  text2: {
    color: Colors.gray,
  },
  progressIndicatorContainer: {
    flex: 1,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.25,
  },
});
