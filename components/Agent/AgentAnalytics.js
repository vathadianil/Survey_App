import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

const AgentAnalytics = ({
  iconName,
  completed,
  total,
  avg,
  sectionName,
  progress,
}) => {
  return (
    <View style={styles.surveyProgressContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={24} />
      </View>

      <View style={styles.textWrapper}>
        {completed && total && (
          <Text style={styles.text1}>
            {completed} of {total}
          </Text>
        )}
        {/* {avg && <Text style={styles.text1}>{Math.round(avg * 100)}</Text>} */}
        <Text style={styles.text2}>{sectionName}</Text>
      </View>
      {progress && (
        <View style={styles.progressIndicatorContainer}>
          <View style={{ width: "100%" }}>
            <ProgressBar
              progress={progress / 100}
              color={Colors.black}
              style={{ borderRadius: 4 }}
            />
          </View>
          <Text style={[styles.text2, { marginTop: 10 }]}>
            {Math.round(progress)}%
          </Text>
        </View>
      )}
    </View>
  );
};

export default AgentAnalytics;

const styles = StyleSheet.create({
  surveyProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  iconContainer: {
    padding: 16,
    backgroundColor: Colors.gray3,
    marginRight: 8,
    borderRadius: 8,
  },
  textWrapper: {
    marginRight: 32,
  },
  text1: {
    fontFamily: "semibold",
  },
  text2: {
    color: Colors.gray,
  },
  progressIndicatorContainer: {
    flex: 1,
    alignItems: "center",
  },
});
