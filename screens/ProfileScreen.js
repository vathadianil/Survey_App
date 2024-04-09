import { StyleSheet, View, Pressable, Text, ScrollView } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import Button from "../components/ui/Button";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import AgentAnalytics from "../components/Agent/AgentAnalytics";
import { AppContext } from "../store/app-context";

const data = [
  {
    sectionName: "Visited Students",
    iconName: "accessibility-outline",
    completed: 2,
    total: 4,
    avg: null,
    progress: 50,
  },
  {
    sectionName: "Completed Surveys",
    iconName: "checkmark-circle-outline",
    completed: 2,
    total: 4,
    avg: null,
    progress: 50,
  },
  {
    sectionName: "Average Completion Rate",
    iconName: "star-outline",
    completed: null,
    total: null,
    avg: 4,
    progress: null,
  },
];

const ProfileScreen = ({ navigation }) => {
  const { loginData, logout } = useContext(AppContext);
  const { agentId, firstName, lastName, userId, collegeId, collegeName } =
    loginData;
  return (
    <SafeAreaView>
      <ScrollView>
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
                logout();
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
            <Text style={styles.nameText}>
              {firstName} {lastName}
            </Text>
            <Text style={styles.loginText}>Login ID : {agentId}</Text>
            <Text style={styles.loginText}>User Name : {userId}</Text>
            <Text style={styles.loginText}>
              College : {collegeId} - {collegeName}
            </Text>
          </View>

          <View style={styles.analyticsContainer}>
            <Text style={styles.analyticsHeaderText}>Summary{`()`}</Text>

            {data.map((item) => (
              <AgentAnalytics {...item} key={item.sectionName} />
            ))}
          </View>
        </View>
      </ScrollView>
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
    textTransform: "capitalize",
  },
  loginText: {
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
