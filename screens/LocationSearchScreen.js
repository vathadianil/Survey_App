import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import LocationList from "../components/Location/LocationList";
import axios from "../util/axios";
import LocationSearchSkelton from "../components/ui/skelton/LocationSearchSkelton";
import NoDataFound from "../components/ui/NoDataFound";
import SearchInput from "../components/SearchInput";
import { GET_LOCATION_LIST } from "../util/apiRequests";
import useSnackBar from "../util/hooks/useSnackBar";
import CustomSnackBar from "../components/ui/paper/CustomSnackBar";

const LocationSearchScreen = () => {
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
      if (item?.villege.toLowerCase().includes(enteredValue?.toLowerCase())) {
        filteredData.push(item);
      }
    });
    setFilteredLocationList(filteredData);
  }

  const getLocationList = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(GET_LOCATION_LIST);
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
    getLocationList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput
        updateInputValueHandler={updateInputValueHandler}
        enteredInput={enteredInput}
        showGoBackBtn={true}
        placeholder={"Search Location"}
        iconType={"search"}
      />

      {isLoading ? (
        <LocationSearchSkelton />
      ) : filteredLocationList.length > 0 && !error ? (
        <LocationList locationList={filteredLocationList} />
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
