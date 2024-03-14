import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomMenu from "./ui/paper/CustomMenu";

const SearchInput = ({
  updateInputValueHandler,
  enteredInput,
  showGoBackBtn,
  placeholder,
  iconType,
  filterValue,
  onChangeValue,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.searchContainer}>
      {showGoBackBtn && (
        <Pressable
          android_ripple={{ color: Colors.shadowColor }}
          style={({ pressed }) => pressed && styles.pressed}
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
        style={[styles.searchBtn, iconType === "filter" && styles.flterBtn]}
      >
        {iconType === "search" && (
          <Ionicons name="search-sharp" size={24} color={Colors.shadowColor} />
        )}
        {iconType === "filter" && (
          <CustomMenu value={filterValue} onChangeValue={onChangeValue} />
        )}
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
  flterBtn: {
    width: 110,
    backgroundColor: "transparent",
  },
  pressed: {
    opacity: 0.25,
  },
});
