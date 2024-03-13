import { FlatList, StyleSheet, Text, View } from "react-native";
import StudentOverview from "../components/Student/StudentOverview";
// import { DUMMY_DATA } from "../data/dummy-data";
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

const HomeScreen = () => {
  const authCtx = useContext(AuthContext);
  const [studentDataList, setStudentDataList] = useState([]);
  const [filteredStudentDataList, setFilteredStudentDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [enteredInput, setEnteredInput] = useState("");
  const [error, setError] = useState(false);

  function updateInputValueHandler(enteredValue) {
    setEnteredInput(enteredValue);
    let filteredData = [];
    studentDataList.filter((item) => {
      if (
        item?.studentName.toLowerCase().includes(enteredValue?.toLowerCase())
      ) {
        filteredData.push(item);
      }
    });
    setFilteredStudentDataList(filteredData);
  }

  const getStudentDetails = async (location) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/student_details?string=${location}`);
      setStudentDataList(data?.data);
      setFilteredStudentDataList(data?.data);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fechLocation = async () => {
      setIsLoading(true);
      const storedLocation = await AsyncStorage.getItem("location");
      if (storedLocation) {
        authCtx.addLocation(storedLocation);
      }
      setIsLoading(false);
    };
    fechLocation();
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

  function renderStudent(itemData) {
    const studentProps = {
      id: itemData.item.id,
      studentName: itemData.item.studentName,
      gender: itemData.item.gender,
      mobileNumber: itemData.item.mobileNumber,
      fatherMobileNumber: itemData.item.fatherMobileNumber,
      permanentAddress: itemData.item.permanentAddress,
      visitedStatus: itemData.item.Visited_Status,
      insterestedStatus: itemData.item.Intrested_Status,
      tokenAmount: itemData.item.Token_Amount,
    };
    return <StudentOverview {...studentProps} />;
  }

  return (
    <SafeAreaView style={styles.container}>
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
          />
          <FlatList
            data={filteredStudentDataList}
            initialNumToRender={6}
            keyExtractor={(student) => student.id}
            renderItem={renderStudent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        error && <NoDataFound />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
