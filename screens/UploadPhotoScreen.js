import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../components/ui/AppBar";

const UploadPhotoScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView>
      <AppBar onPress={() => navigation.goBack()} title={"Upload Images"} />
      <Text>UploadPhotoScreen</Text>
    </SafeAreaView>
  );
};

export default UploadPhotoScreen;

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 12,
  },
});
