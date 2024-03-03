import { FlatList, StyleSheet, View } from "react-native";
import StudentOverview from "../components/Student/StudentOverview";
// import { DUMMY_DATA } from "../data/dummy-data";
import { useEffect, useState } from "react";
import axios from "../util/axios";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const HomeScreen = () => {
  const [studentDataList, setStudentDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    getStudentDetails();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
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
  return (
    <View style={styles.container}>
      <FlatList
        data={studentDataList}
        initialNumToRender={6}
        keyExtractor={(student) => student.id}
        renderItem={renderStudent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
