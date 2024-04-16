import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import LocationSearchSkelton from "../../components/ui/skelton/LocationSearchSkelton";
import LocationList from "../../components/Location/LocationList";
import NoDataFound from "../../components/ui/NoDataFound";
import CustomSnackBar from "../../components/ui/paper/CustomSnackBar";
import { GET_VILLAGE_LIST } from "../../util/apiRequests";
import useSnackBar from "../../util/hooks/useSnackBar";
import axios from "../../util/axios";

const VilllageLocationSearchScreen = ({ route }) => {
  const { locationKey, district, mandal } = route?.params;
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

  const getVillageList = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${GET_VILLAGE_LIST}/${district}/${mandal}`
      );
      setLocationList(data?.data);
      setFilteredLocationList(data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      onToggleSnackBar();
      setError(true);
    }
  };
  useEffect(() => {
    getVillageList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput
        updateInputValueHandler={updateInputValueHandler}
        enteredInput={enteredInput}
        showGoBackBtn={true}
        placeholder={`Search Village in ${mandal}`}
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
        style={styles.snackBarStyle}
        onDismissSnackBar={onDismissSnackBar}
        visible={visible}
        message={"Something went wrong. Please Try Again!"}
      />
    </SafeAreaView>
  );
};

export default VilllageLocationSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snackBarStyle: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
  },
});
