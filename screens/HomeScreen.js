import { FlatList, StyleSheet, View } from "react-native";
import StudentOverview from "../components/Student/StudentOverview";
import { DUMMY_DATA } from "../data/dummy-data";
import { useEffect, useRef } from "react";

const HomeScreen = () => {
  const flatListRef = useRef();
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index: 0 });
    }
  }, []);

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
        ref={flatListRef}
        data={DUMMY_DATA}
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
