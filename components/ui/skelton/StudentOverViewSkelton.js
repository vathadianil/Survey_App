import { Dimensions, FlatList, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/styles";
import Skelton from "./Skelton";

function renderSkelton() {
  const cardWidth = Dimensions.get("window").width * 0.8;
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Skelton width={80} height={80} style={{ borderRadius: 40 }} />
      <View>
        <Skelton
          width={cardWidth - 120}
          height={15}
          style={{ borderRadius: 6 }}
        />
        <Skelton
          width={cardWidth - 120}
          height={15}
          style={{ borderRadius: 6, marginTop: 12 }}
        />
      </View>
    </View>
  );
}

const StudentOverViewSkelton = () => {
  const skeltonData = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];
  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={skeltonData}
        initialNumToRender={6}
        keyExtractor={(data) => data.id}
        renderItem={renderSkelton}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default StudentOverViewSkelton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.shadowColor,
  },
  card: {
    backgroundColor: Colors.white,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: Platform.select({ android: "hidden" }),
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
