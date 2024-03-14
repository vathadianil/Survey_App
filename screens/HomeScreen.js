import { FlatList, StyleSheet, View } from "react-native";
import StudentOverview from "../components/Student/StudentOverview";
import { useContext, useEffect, useState } from "react";
import axios from "../util/axios";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentLocation from "../components/CurrentLocation";
import NoLocation from "../components/NoLocation";
import { AuthContext } from "../store/auth-context";
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

const HomeScreen = () => {
  const authCtx = useContext(AuthContext);
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
      const formList = authCtx.formList;
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
      const fatherOccupationList = fatherOccupation?.value?.data?.fOccupation;
      const motherOccupationList = motherOccupation?.value?.data?.mOccupation;
      const casteList = caste?.value?.data?.data;
      const subCasteList = subCaste?.value?.data?.SubCaste;
      const hallTicketNoList = hallTicketNo?.value?.data?.HtNo;
      const mediumList = medium?.value?.data?.Medium;
      const religionList = religion?.value?.data?.Religion;

      authCtx.addFormList({
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
      authCtx.addLocation(storedLocation);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fechLocation();
    getRequiredListData();
  }, []);

  useEffect(() => {
    if (authCtx.location) {
      getStudentDetails(authCtx.location);
    }
  }, [authCtx.location]);

  if (!authCtx.location && !isLoading) {
    return (
      <SafeAreaView style={[styles.container, { padding: 0 }]}>
        <NoLocation />
      </SafeAreaView>
    );
  }

  function renderStudent({ item }) {
    const studentProps = {
      id: item.id,
      studentName: item.studentName,
      gender: item.gender,
      mobileNumber: item.mobileNumber,
      fatherMobileNumber: item.fatherMobileNumber,
      permanentAddress: item.permanentAddress,
      visitedStatus: item.Visited_Status,
      insterestedStatus: item.Intrested_Status,
      tokenAmount: item.Token_Amount,
    };
    return <StudentOverview {...studentProps} />;
  }

  return (
    <SafeAreaView style={[styles.container, isLoading && { paddingBottom: 0 }]}>
      {authCtx.location && <CurrentLocation />}

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
