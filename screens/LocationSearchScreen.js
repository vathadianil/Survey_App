import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "../constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import LocationList from "../components/LocationList";
import axios from "../util/axios";
import LocationSearchSkelton from "../components/ui/skelton/LocationSearchSkelton";
import NoDataFound from "../components/ui/NoDataFound";

const LocationSearchScreen = ({ navigation }) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [locationList, setLocationList] = useState([]);
  const [filteredLocationList, setFilteredLocationList] = useState([]);
  const [error, setError] = useState(false);

  function updateInputValueHandler(enteredValue) {
    setEnteredInput(enteredValue);
    let filteredData = [];
    locationList.filter((item) => {
      if (
        item?.permanentAddress
          .toLowerCase()
          .includes(enteredValue?.toLowerCase())
      ) {
        filteredData.push(item);
      }
    });
    setFilteredLocationList(filteredData);
  }

  const getLocationList = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/getAddressesList");
      setLocationList(data?.data);
      setFilteredLocationList(data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getLocationList();
  }, []);
  // if (isLoading) {
  //   return <LocationSearchSkelton />;
  // }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-circle" size={30} />
        </Pressable>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search Location"
            onChangeText={(text) => updateInputValueHandler(text)}
            value={enteredInput}
            style={styles.searchInput}
            cursorColor={Colors.black}
          />
        </View>
        <View style={styles.searchBtn}>
          <Ionicons name="search-sharp" size={24} color={Colors.shadowColor} />
        </View>
      </View>

      {isLoading ? (
        <LocationSearchSkelton />
      ) : filteredLocationList.length > 0 && !error ? (
        <LocationList locationList={filteredLocationList} />
      ) : (
        error && <NoDataFound />
      )}
    </SafeAreaView>
  );
};

export default LocationSearchScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary400,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
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
    color: Colors.black,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: Colors.black,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
