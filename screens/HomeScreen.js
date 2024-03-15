import { FlatList, StyleSheet, View } from "react-native";
import StudentOverview from "../components/Student/StudentOverview";
import { useContext, useEffect, useState } from "react";
import axios from "../util/axios";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentLocation from "../components/CurrentLocation";
import NoLocation from "../components/NoLocation";
import StudentOverViewSkelton from "../components/ui/skelton/StudentOverViewSkelton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoDataFound from "../components/ui/NoDataFound";
import SearchInput from "../components/SearchInput";
import useFilter from "../util/hooks/useFilter";
import {
  GET_CASTE_LIST,
  GET_FATHER_OCCUPATION_LIST,
  GET_HT_NO_LIST,
  GET_MEDIUM_LIST,
  GET_MOTHER_OCCUPATION_LIST,
  GET_RELIGION_LIST,
  GET_STUDENT_LIST,
  GET_SUB_CASTE_LIST,
} from "../util/apiRequests";
import { AppContext } from "../store/app-context";

const HomeScreen = () => {
  const appCtx = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const {
    inputValue: enteredInput,
    originalData: studentDataList,
    filteredData: filteredStudentDataList,
    filterValue,
    inputValueChangeHandler: updateInputValueHandler,
    originalDataChangeHandler: studentDataChangeHandler,
    filterValueChangeHandler: onChangeFilterValue,
  } = useFilter("", "ALL", ["studentName", "Visited_Status"]);

  const getStudentDetails = async (location) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${GET_STUDENT_LIST}${location}`);
      studentDataChangeHandler(data?.data);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

  const getRequiredListData = async () => {
    try {
      const formList = appCtx.formList;
      const [
        fatherOccupation,
        motherOccupation,
        caste,
        subCaste,
        hallTicketNo,
        medium,
        religion,
      ] = await Promise.allSettled([
        axios.get(GET_FATHER_OCCUPATION_LIST),
        axios.get(GET_MOTHER_OCCUPATION_LIST),
        axios.get(GET_CASTE_LIST),
        axios.get(GET_SUB_CASTE_LIST),
        axios.get(GET_HT_NO_LIST),
        axios.get(GET_MEDIUM_LIST),
        axios.get(GET_RELIGION_LIST),
      ]);

      const fatherOccupationList = fatherOccupation?.value?.data?.data;
      const motherOccupationList = motherOccupation?.value?.data?.value;
      const casteList = caste?.value?.data?.data;
      const subCasteList = subCaste?.value?.data?.data;
      const hallTicketNoList = hallTicketNo?.value?.data?.data;
      const mediumList = medium?.value?.data?.data;
      const religionList = religion?.value?.data?.data;

      appCtx.addFormList({
        ...formList,
        fatherOccupationList,
        motherOccupationList,
        casteList,
        subCasteList,
        hallTicketNoList,
        mediumList,
        religionList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fechLocation = async () => {
    setIsLoading(true);
    const storedLocation = await AsyncStorage.getItem("location");
    if (storedLocation) {
      appCtx.addLocation(storedLocation);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fechLocation();
    getRequiredListData();
  }, []);

  useEffect(() => {
    if (appCtx.location) {
      getStudentDetails(appCtx.location);
    }
  }, [appCtx.location]);

  if (!appCtx.location && !isLoading) {
    return (
      <SafeAreaView style={[styles.container, { padding: 0 }]}>
        <NoLocation />
      </SafeAreaView>
    );
  }

  function renderStudent({ item }) {
    return <StudentOverview studentData={item} />;
  }

  return (
    <SafeAreaView style={[styles.container, isLoading && { paddingBottom: 0 }]}>
      {appCtx.location && <CurrentLocation />}

      {isLoading ? (
        <StudentOverViewSkelton />
      ) : studentDataList?.length > 0 && !error ? (
        <View>
          <SearchInput
            updateInputValueHandler={updateInputValueHandler}
            enteredInput={enteredInput}
            placeholder={"Search Student Name"}
            iconType={"filter"}
            filterValue={filterValue}
            onChangeValue={onChangeFilterValue}
          />
          <FlatList
            data={filteredStudentDataList}
            contentContainerStyle={{
              padding: 16,
            }}
            initialNumToRender={6}
            keyExtractor={(student) => student.id}
            renderItem={renderStudent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <NoDataFound />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 164,
  },
});
