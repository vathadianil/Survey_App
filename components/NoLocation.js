import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import Button from "./ui/Button";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/styles";

const NoLocation = () => {
  const navigation = useNavigation();
  const addLocationHndlr = () => {
    navigation.navigate("LocationSearch");
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <LottieView
          style={styles.image}
          source={require(`../assets/lottie-animations/location.json`)}
          autoPlay
        />
      </View>
      <View style={styles.btnContainer}>
        <Button onPress={addLocationHndlr}>Add Location</Button>
      </View>
    </View>
  );
};

export default NoLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary400,
  },
  text: {
    marginVertical: 32,
    fontFamily: "regular",
    fontSize: 14,
  },
  imageContainer: {
    width: "90%",
    aspectRatio: 1,
  },
  image: {
    flex: 1,
  },
  btnContainer: {
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
