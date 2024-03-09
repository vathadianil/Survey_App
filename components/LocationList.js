import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";

const LocationList = ({ locationList }) => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  function renderLocation(itemData) {
    const locationData = {
      id: itemData.item.id,
      location: itemData.item.permanentAddress,
    };

    return (
      <View style={styles.container}>
        <Pressable
          android_ripple={{ color: Colors.shadowColor }}
          style={({ pressed }) => pressed && styles.pressedBtn}
          onPress={() => {
            authCtx.addLocation(locationData.location);
            navigation.navigate("Home");
          }}
        >
          <View style={styles.innerContainer}>
            <Ionicons name="location-outline" size={24} style={styles.icon} />
            <Text style={styles.locationText}>{locationData.location}</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={locationList}
      initialNumToRender={6}
      keyExtractor={(location) => location.id}
      renderItem={renderLocation}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    />
  );
};

export default LocationList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 8,
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 10,
  },
  locationText: {
    fontSize: 14,
    fontFamily: "light",
    textTransform: "capitalize",
  },

  pressedBtn: {
    opacity: 0.25,
  },
});
