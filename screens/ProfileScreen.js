import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import Button from "../components/ui/Button";
import { Colors } from "../constants/styles";
import { AuthContext } from "../store/auth-context";

const ProfileScreen = () => {
  const authCtx = useContext(AuthContext);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <LottieView
            style={styles.image}
            source={require(`../assets/lottie-animations/male1.json`)}
            autoPlay
            loop={false}
          />
        </View>

        <Button
          onPress={() => {
            authCtx.logout();
          }}
          style={styles.btn}
        >
          Log out
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 16,
    alignItems: "center",
  },

  imageContainer: {
    height: 200,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
  },
  btn: {
    backgroundColor: Colors.error800,
  },
});
