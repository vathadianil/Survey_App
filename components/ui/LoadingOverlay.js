import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/styles";

const LoadingOverlay = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={"large"} color={Colors.primary800} />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
