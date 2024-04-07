import { FlatList, StyleSheet, View } from "react-native";
import StudentOverview from "../components/Student/StudentOverview";
import { useContext, useEffect, useState } from "react";
import axios from "../util/axios";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentLocation from "../components/Location/CurrentLocation";
import NoLocation from "../components/Location/NoLocation";
import StudentOverViewSkelton from "../components/ui/skelton/StudentOverViewSkelton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoDataFound from "../components/ui/NoDataFound";
import SearchInput from "../components/SearchInput";
import useFilter from "../util/hooks/useFilter";
import {
  GET_ADMISSION_LIST,
  GET_CASTE_LIST,
  GET_FATHER_OCCUPATION_LIST,
  GET_HT_NO_LIST,
  GET_MEDIUM_LIST,
  GET_MOTHER_OCCUPATION_LIST,
  GET_PREVIOUS_EDUCATION_LIST,
  GET_RELIGION_LIST,
  GET_STUDENT_LIST,
  GET_SUB_CASTE_LIST,
} from "../util/apiRequests";
import { AppContext } from "../store/app-context";
import useSnackBar from "../util/hooks/useSnackBar";
import CustomSnackBar from "../components/ui/paper/CustomSnackBar";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const HomeScreen = ({ route }) => {
  const isRecordUpdated = route?.params?.submittedTimeStamp;
  const appCtx = useContext(AppContext);
  const [isLocationFetching, setIsLocationFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { visible, onToggleSnackBar, onDismissSnackBar } = useSnackBar();
  const {
    inputValue: enteredInput,
    originalData: studentDataList,
    filteredData: filteredStudentDataList,
    filterValue,
    inputValueChangeHandler: updateInputValueHandler,
    originalDataChangeHandler: studentDataChangeHandler,
    filterValueChangeHandler: onChangeFilterValue,
  } = useFilter("", "ALL", ["studentName", "visitedStatus"]);

  const getStudentDetails = async (location) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${GET_STUDENT_LIST}${location}`);
      studentDataChangeHandler(data?.data);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      onToggleSnackBar();
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
        previousEducation,
        admissionCategory,
      ] = await Promise.allSettled([
        axios.get(GET_FATHER_OCCUPATION_LIST),
        axios.get(GET_MOTHER_OCCUPATION_LIST),
        axios.get(GET_CASTE_LIST),
        axios.get(GET_SUB_CASTE_LIST),
        axios.get(GET_HT_NO_LIST),
        axios.get(GET_MEDIUM_LIST),
        axios.get(GET_RELIGION_LIST),
        axios.get(GET_PREVIOUS_EDUCATION_LIST),
        axios.get(GET_ADMISSION_LIST),
      ]);
      const fatherOccupationList = fatherOccupation?.value?.data?.data;
      const motherOccupationList = motherOccupation?.value?.data?.value;
      const casteList = caste?.value?.data?.data;
      const subCasteList = subCaste?.value?.data?.data;
      const hallTicketNoList = hallTicketNo?.value?.data?.data;
      const mediumList = medium?.value?.data?.data;
      const religionList = religion?.value?.data?.data;
      const previousEducationList = previousEducation.value?.data?.data;
      const admissionCategoryList = admissionCategory?.value?.data?.data;

      appCtx.addFormList({
        ...formList,
        fatherOccupationList,
        motherOccupationList,
        casteList,
        subCasteList,
        hallTicketNoList,
        mediumList,
        religionList,
        previousEducationList,
        admissionCategoryList,
      });
    } catch (error) {
      setError(true);
      onToggleSnackBar();
      console.log(error);
    }
  };

  const fechLocation = async () => {
    setIsLocationFetching(true);
    const storedLocation = await AsyncStorage.getItem("location");
    if (storedLocation) {
      appCtx.addLocation(storedLocation);
    }
    setIsLocationFetching(false);
  };

  useEffect(() => {
    fechLocation();
    getRequiredListData();
  }, []);

  useEffect(() => {
    if (appCtx.location) {
      getStudentDetails(appCtx.location);
    }
  }, [appCtx.location, isRecordUpdated]);

  if (isLocationFetching) {
    return (
      <SafeAreaView style={[styles.container, { paddingBottom: 0 }]}>
        <LoadingOverlay />
      </SafeAreaView>
    );
  }

  if (!appCtx.location && !isLoading) {
    return (
      <SafeAreaView style={[styles.container, { paddingBottom: 0 }]}>
        <NoLocation />
      </SafeAreaView>
    );
  }

  function renderStudent({ item }) {
    return <StudentOverview studentData={item} />;
  }

  return (
    <SafeAreaView style={[styles.container, isLoading && { paddingBottom: 0 }]}>
      {appCtx.location && <CurrentLocation location={appCtx.location} />}

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
        error && <NoDataFound />
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 180,
  },
  snackBarStyle: {
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
  },
});
