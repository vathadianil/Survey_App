import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../components/ui/AppBar";
import { WebView } from "react-native-webview";
import { Colors } from "../constants/styles";
import { useEffect, useRef, useState } from "react";

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
      font-size: 16px;
    }
    .btn:disabled,
    .btn[disabled] {
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
      cursor: not-allowed;
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
    document.getElementById("renderBtn").disabled = true;
    document.getElementById("renderBtn").addEventListener("click", () => {
      window.ReactNativeWebView.postMessage('paymentBtnClicked')
      cashfree.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_self",
      });
    });
  </script>
</html>
`;

const CheckoutScreen = ({ navigation }) => {
  const [showFeeDetails, setShowFeeDetails] = useState(true);

  const ref = useRef(null);
  const sessionId = `"session_6kD4ZP7Q-isW0k_VFBixo9K8B4wpXFp52q5BguNetJrPkhl5qA6LA6_yvUIDjzvGPhdmXxGtWiH_LXtC3r9UN9tJKXCl9H92le38HDVPXBlv"`;
  const run = `
  document.getElementById("renderBtn").disabled = false;
  const sessionId=${sessionId};
  `;
  useEffect(() => {
    setTimeout(() => {
      ref.current?.injectJavaScript(run);
    }, 500);
  }, [ref.current]);

  const onMessage = (event) => {
    if (
      event.nativeEvent.data &&
      event.nativeEvent.data === "paymentBtnClicked"
    ) {
      setShowFeeDetails(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {showFeeDetails && (
        <View style={{ flex: 1 }}>
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
        </View>
      )}

      <WebView
        ref={ref}
        style={styles.webViewContainer}
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled={true}
        mixedContentMode="never" //security
        onMessage={onMessage}
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
});
