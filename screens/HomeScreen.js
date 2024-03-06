import { FlatList, StyleSheet } from "react-native";
import StudentOverview from "../components/Student/StudentOverview";
// import { DUMMY_DATA } from "../data/dummy-data";
import { useContext, useEffect, useState } from "react";
import axios from "../util/axios";
import { SafeAreaView } from "react-native-safe-area-context";
import CurrentLocation from "../components/CurrentLocation";
import NoLocation from "../components/NoLocation";
import { AuthContext } from "../store/auth-context";
import StudentOverViewSkelton from "../components/ui/skelton/StudentOverViewSkelton";

const HomeScreen = () => {
  const [studentDataList, setStudentDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const getStudentDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/addresses?village_name=andhra");
      setStudentDataList(data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // getStudentDetails();
  }, []);

  if (isLoading) {
    return <StudentOverViewSkelton />;
  }

  function renderStudent(itemData) {
    const studentProps = {
      id: itemData.item.id,
      studentName: itemData.item.studentName,
      gender: itemData.item.gender,
      mobileNumber: itemData.item.mobileNumber,
      fatherMobileNumber: itemData.item.fatherMobileNumber,
      permanentAddress: itemData.item.permanentAddress,
    };
    return <StudentOverview {...studentProps} />;
  }
  if (!authCtx.location) {
    return (
      <SafeAreaView style={[styles.container, { padding: 0 }]}>
        <NoLocation />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CurrentLocation />
      <FlatList
        data={studentDataList}
        initialNumToRender={6}
        keyExtractor={(student) => student.id}
        renderItem={renderStudent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
