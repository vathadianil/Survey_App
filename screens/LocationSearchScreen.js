import { StyleSheet, View } from "react-native";
import Input from "../components/ui/Input";
import { useState } from "react";
import { Colors } from "../constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";

const LocationSearchScreen = () => {
  const [enteredInput, setEnteredInput] = useState("");
  function updateInputValueHandler(enteredValue) {
    setEnteredInput(enteredValue);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        {/* <Ionicons name="search-sharp" size={24} style={styles.searchIcon} /> */}

        <View style={styles.searchWrapper}>
          <Input
            placeholder="Search Location"
            onUpdateValue={updateInputValueHandler.bind(this)}
            value={enteredInput}
            style={styles.searchInput}
          />
        </View>
        <View style={styles.searchBtn}>
          <Ionicons
            name="location-outline"
            size={24}
            color={Colors.primary800}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocationSearchScreen;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    elevation: 3,
  },
  searchContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary400,
    borderRadius: 8,
    marginVertical: 8,
    paddingLeft: 4,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: Colors.gray,
  },
  searchWrapper: {
    flex: 1,
  },

  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    padding: 8,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
