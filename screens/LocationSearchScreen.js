import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import LocationList from "../components/Location/LocationList";
import axios from "../util/axios";
import LocationSearchSkelton from "../components/ui/skelton/LocationSearchSkelton";
import NoDataFound from "../components/ui/NoDataFound";
import SearchInput from "../components/SearchInput";
import {
  GET_DISTRICT_LIST,
  GET_LOCATION_LIST,
  GET_MANDAL_LIST,
} from "../util/apiRequests";
import useSnackBar from "../util/hooks/useSnackBar";
import CustomSnackBar from "../components/ui/paper/CustomSnackBar";
import { DISTRICT, MANDAL, VILLAGE } from "../constants/location-names";

const LocationSearchScreen = ({ route }) => {
  const { locationKey, location } = route?.params;
  console.log(locationKey);
  const [enteredInput, setEnteredInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [locationList, setLocationList] = useState([]);
  const [filteredLocationList, setFilteredLocationList] = useState([]);
  const [error, setError] = useState(false);
  const { visible, onToggleSnackBar, onDismissSnackBar } = useSnackBar();

  function updateInputValueHandler(enteredValue) {
    setEnteredInput(enteredValue);
    let filteredData = [];
    locationList.filter((item) => {
      if (
        item[locationKey]?.toLowerCase().includes(enteredValue?.toLowerCase())
      ) {
        filteredData.push(item);
      }
    });
    setFilteredLocationList(filteredData);
  }

  const getDistrictList = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(GET_DISTRICT_LIST);
      setLocationList(data?.data);
      setFilteredLocationList(data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      onToggleSnackBar();
      setError(true);
    }
  };

  const getMandalList = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${GET_MANDAL_LIST}/${location}`);
      setLocationList(data?.data);
      setFilteredLocationList(data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      onToggleSnackBar();
      setError(true);
    }
  };
  useEffect(() => {
    if (locationKey === DISTRICT) {
      getDistrictList();
    } else if (locationKey === MANDAL) {
      getMandalList();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput
        updateInputValueHandler={updateInputValueHandler}
        enteredInput={enteredInput}
        showGoBackBtn={true}
        placeholder={`Search ${
          locationKey === DISTRICT
            ? "District"
            : locationKey === MANDAL
            ? "Mandal"
            : locationKey === VILLAGE
            ? "Village"
            : ""
        }`}
        iconType={"search"}
      />

      {isLoading ? (
        <LocationSearchSkelton />
      ) : filteredLocationList.length > 0 && !error ? (
        <LocationList
          locationList={filteredLocationList}
          locationKey={locationKey}
        />
      ) : (
        <NoDataFound />
      )}
      <CustomSnackBar
        onDismissSnackBar={onDismissSnackBar}
        visible={visible}
        message={"Something went wrong. Please Try Again!"}
      />
    </SafeAreaView>
  );
};

export default LocationSearchScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
});
