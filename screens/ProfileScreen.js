import { StyleSheet, View, Pressable, Text } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import Button from "../components/ui/Button";
import { Colors } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import { Ionicons } from "@expo/vector-icons";
import SurveyorAnalytics from "../components/SurveyorAnalytics";
import { ProgressBar } from "react-native-paper";

const data = [
  {
    iconName: "accessibility-outline",
    completed: 2,
    total: 4,
    avg: null,
    sectionName: "Visited Students",
    progress: 50,
  },
  {
    iconName: "checkmark-circle-outline",
    completed: 2,
    total: 4,
    avg: null,
    sectionName: "Completed Surveys",
    progress: 50,
  },
  {
    iconName: "star-outline",
    completed: null,
    total: null,
    avg: 4,
    sectionName: "Average Completion Rate",
    progress: null,
  },
];

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

          {data.map((item) => (
            <SurveyorAnalytics {...item} key={item.sectionName} />
          ))}
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

  pressed: {
    opacity: 0.25,
  },
});
