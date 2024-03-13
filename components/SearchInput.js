import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchInput = ({
  updateInputValueHandler,
  enteredInput,
  showGoBackBtn,
  placeholder,
  iconType,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.searchContainer]}>
      {showGoBackBtn && (
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-circle" size={30} />
        </Pressable>
      )}
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder={placeholder}
          onChangeText={(text) => updateInputValueHandler(text)}
          value={enteredInput}
          style={styles.searchInput}
          cursorColor={Colors.black}
        />
      </View>
      <View
        style={[
          styles.searchBtn,
          {
            backgroundColor:
              iconType === "filter" ? Colors.primary800 : Colors.black,
          },
        ]}
      >
        <Pressable onPress={() => {}}>
          <Ionicons
            name={
              iconType === "filter" ? "filter-circle-outline" : "search-sharp"
            }
            size={24}
            color={Colors.shadowColor}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary400,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    paddingLeft: 4,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: Colors.gray,
  },
  searchWrapper: {
    flex: 1,
  },

  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    padding: 8,
    color: Colors.black,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: Colors.black,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
