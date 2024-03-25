import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../components/ui/AppBar";
import { WebView } from "react-native-webview";
import { Colors } from "../constants/styles";
import { useEffect, useRef } from "react";
import { Linking } from "react-native";

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
  </head>
  <style>
    .container {
      display: flex;
      justify-content: center;
    }
    .btn {
      padding: 0.5em 1.5em;
      background-color: #1871de;
      color: #fff;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      border-radius: 0.2em;
      justify-content: center;
      font-size: 12px;
    }
  </style>
  <body>
    <div class="container">
      <button type="button" id="renderBtn" class="btn">Pay Now</button>
    </div>
  </body>
  <script>
    
      
    const cashfree = Cashfree({
      mode: "sandbox", //or production,
    });
    document.getElementById("renderBtn").addEventListener("click", () => {
      cashfree.checkout({
        paymentSessionId: sessionId,
      });
    });
  </script>
</html>
`;

const CheckoutScreen = ({ navigation }) => {
  const ref = useRef(null);
  const run = `
   const sessionId="session_6kD4ZP7Q-isW0k_VFBixo9K8B4wpXFp52q5BguNetJrPkhl5qA6LA6_yvUIDjzvGPhdmXxGtWiH_LXtC3r9UN9tJKXCl9H92le38HDVPXBlv";
  `;

  setTimeout(() => {
    ref.current?.injectJavaScript(run);
  }, 100);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <AppBar onPress={() => navigation.goBack()} title={"Checkout"} />
      <WebView
        ref={ref}
        style={styles.container}
        // originWhitelist={["*"]}
        source={{ html }}
      />
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
  },
});
