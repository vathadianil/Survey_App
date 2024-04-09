import { StyleSheet, View, Pressable, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import Button from "../components/ui/Button";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import AgentAnalytics from "../components/Agent/AgentAnalytics";
import { AppContext } from "../store/app-context";
import { GET_ANALYTICS_DATA } from "../util/apiRequests";
import axios from "../util/axios";
import AnalyticsSkelton from "../components/ui/skelton/AnalyticsSkelton";
import NoDataFound from "../components/ui/NoDataFound";
import useSnackBar from "../util/hooks/useSnackBar";
import CustomSnackBar from "../components/ui/paper/CustomSnackBar";

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
  const [analyticsData, setAnalyticsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { visible, onToggleSnackBar, onDismissSnackBar } = useSnackBar();
  const { loginData, logout, location, formSubmittedTimeStamp } =
    useContext(AppContext);
  const { agentId, firstName, lastName, userId, collegeId, collegeName } =
    loginData;

  const getAnalyticsData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${GET_ANALYTICS_DATA}${location}`);
      setAnalyticsData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      onToggleSnackBar();
      setError(true);
    }
  };
  useEffect(() => {
    getAnalyticsData();
  }, [location, formSubmittedTimeStamp]);

  return (
    <SafeAreaView style={styles.container}>
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
        <View style={styles.analyticsHeaderContainer}>
          <Text style={styles.analyticsHeaderText}>Summary</Text>
          <Text style={styles.locationText}>{` (${location})`}</Text>
        </View>
        {isLoading ? (
          <AnalyticsSkelton />
        ) : analyticsData.length > 0 && !error ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {analyticsData?.map((item) => (
              <AgentAnalytics {...item} key={item.sectionName} />
            ))}
          </ScrollView>
        ) : (
          <NoDataFound />
        )}
      </View>
      <CustomSnackBar
        onDismissSnackBar={onDismissSnackBar}
        visible={visible}
        message={"Something went wrong. Please Try Again!"}
        style={styles.snackBarStyle}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  analyticsContainer: { flex: 1, marginTop: 16, marginBottom: 70 },
  analyticsHeaderContainer: { flexDirection: "row", alignItems: "center" },
  locationText: {
    fontFamily: "semibold",
    textTransform: "capitalize",
    color: Colors.gray,
  },
  analyticsHeaderText: {
    fontFamily: "medium",
    fontSize: 20,
    textTransform: "capitalize",
  },

  pressed: {
    opacity: 0.25,
  },
  snackBarStyle: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
  },
});
