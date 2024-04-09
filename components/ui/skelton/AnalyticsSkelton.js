import { Dimensions, FlatList, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Skelton from "./Skelton";
import { Colors } from "../../../constants/styles";

function renderSkelton() {
  const cardWidth = Dimensions.get("window").width * 0.9;
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Skelton width={40} height={40} style={{ borderRadius: 5 }} />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Skelton
          width={cardWidth - 120}
          height={7}
          style={{ borderRadius: 6, marginBottom: 4 }}
        />
        <Skelton
          width={cardWidth - 120}
          height={7}
          style={{ borderRadius: 6 }}
        />
      </View>
    </View>
  );
}

const AnalyticsSkelton = () => {
  const skeltonData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
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

export default AnalyticsSkelton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
