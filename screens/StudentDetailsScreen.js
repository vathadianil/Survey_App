import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { Linking } from "react-native";
import { Switch, List } from "react-native-paper";
import { useState } from "react";

const StudentDetailsScreen = ({ route, navigation }) => {
  const [isInterestSwitchOn, setIsInterestSwitchOn] = useState(false);

  const onToggleInterestSwitch = () =>
    setIsInterestSwitchOn(!isInterestSwitchOn);
  const {
    studentName,
    gender,
    mobileNumber,
    fatherMobileNumber,
    permanentAddress,
  } = route.params;

  async function phoneNumberPressHndlr(mobileNumber) {
    const isSupported = await Linking.canOpenURL(`tel:${mobileNumber}`);
    if (isSupported) {
      Linking.openURL(`tel:${mobileNumber}`);
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.appBar}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-circle" size={32} />
        </Pressable>
        <Text style={styles.title}>{studentName}</Text>
        <View></View>
      </View>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <LottieView
              style={styles.image}
              source={
                gender === "Female"
                  ? require(`../assets/lottie-animations/female1.json`)
                  : require(`../assets/lottie-animations/male1.json`)
              }
              autoPlay
              loop={false}
            />
          </View>

          <View>
            <Pressable
              onPress={phoneNumberPressHndlr.bind(this, mobileNumber)}
              style={styles.detailContainer}
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
                style={styles.detailContainer}
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
        <View style={[styles.detailContainer, styles.locationContainer]}>
          <Ionicons name="location" size={12} style={styles.icon} />
          <Text style={[styles.detailText]}>{permanentAddress}</Text>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Visited Status</Text>
          <Switch
            value={isInterestSwitchOn}
            onValueChange={onToggleInterestSwitch}
            color={Colors.primary800}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Interested To Join</Text>
          <Switch
            value={isInterestSwitchOn}
            onValueChange={onToggleInterestSwitch}
            color={Colors.primary800}
          />
        </View>
        <List.AccordionGroup>
          <List.Accordion title="Accordion 1" id="1">
            <List.Item title="Item 1" />
          </List.Accordion>
          <List.Accordion title="Accordion 2" id="2">
            <List.Item title="Item 2" />
          </List.Accordion>
          <View>
            <Text>
              List.Accordion can be wrapped because implementation uses
              React.Context.
            </Text>
            <List.Accordion title="Accordion 3" id="3">
              <List.Item title="Item 3" />
            </List.Accordion>
          </View>
        </List.AccordionGroup>
      </View>
    </SafeAreaView>
  );
};

export default StudentDetailsScreen;

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 12,
  },
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

  title: {
    fontFamily: "semibold",
    fontSize: 16,
    color: Colors.gray,
    textTransform: "capitalize",
  },
  innerContainer: { alignItems: "center" },
  imageContainer: {
    height: 150,
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
  switchText: {
    fontFamily: "medium",
  },
});
