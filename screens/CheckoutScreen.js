import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../components/ui/AppBar";
import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";

const CheckoutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <AppBar onPress={() => navigation.goBack()} title={"Checkout"} />
      <View style={styles.container}>
        <View style={styles.feeContainer}>
          <Text style={styles.text}>Registration Fee</Text>
          <Text style={styles.text}>{"\u20B9"}1000.00</Text>
        </View>

        <View style={styles.feeContainer}>
          <Text style={styles.text}>Processing Fee</Text>
          <Text style={styles.text}>{"\u20B9"}0.00</Text>
        </View>

        <View style={[styles.feeContainer]}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>{"\u20B9"}1000.00</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button
          onPress={() => navigation.navigate("PaymentComplete")}
          style={styles.btn}
        >
          Pay Now
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.shadowColor,
    paddingHorizontal: 32,
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: Colors.shadowColor,
  },
  feeContainer: {
    paddingTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: { fontFamily: "regular", fontSize: 16 },
  totalText: { fontFamily: "medium", fontSize: 18 },
  btnContainer: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    width: "30%",
  },
});
