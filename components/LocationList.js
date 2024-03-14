import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";

const LocationList = ({ locationList }) => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  function renderLocation({ item }) {
    const locationData = {
      id: item.id,
      location: item.permanentAddress,
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
      contentContainerStyle={{
        padding: 16,
      }}
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
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 3,
    shadowRadius: 8,
    overflow: Platform.select({ android: "hidden" }),
  },

  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  icon: {
    marginRight: 10,
  },

  locationText: {
    fontFamily: "light",
    fontSize: 12,
    textTransform: "capitalize",
    flex: 1,
    flexWrap: "wrap",
  },

  pressedBtn: {
    opacity: 0.25,
  },
});
