import { StyleSheet, View, Text } from "react-native";
import { List, Card, TextInput, RadioButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";

const admissionCategoryList = [
  { label: "Convener", value: "Convener" },
  { label: "Management", value: "Management" },
  { label: "Spot", value: "Spot" },
  { label: "Regular", value: "Regular" },
  { label: "On Transfer Certificate", value: "On Transfer Certificate" },
  { label: "Lateral Entry", value: "Lateral Entry" },
];

const courseOrGroupList = [
  { label: "Engineering", value: "Engineering" },
  { label: "Inter", value: "Inter" },
];

const mediumList = [
  { label: "English", value: "English" },
  { label: "Telugu", value: "Telugu" },
];

const EducationDetails = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Card mode="elevated" style={styles.container}>
      <List.Accordion
        id="2"
        titleStyle={styles.accordionText}
        title="Education Details"
        left={(props) => (
          <Ionicons {...props} name="person-add-outline" size={20} />
        )}
      >
        <View style={styles.inputContainer}>
          <TextInput
            label="SSC Hall Ticket Number"
            mode="outlined"
            activeOutlineColor={Colors.primary800}
            outlineColor={Colors.primary800}
            contentStyle={styles.textInputContent}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Last Studied School/College"
            mode="outlined"
            activeOutlineColor={Colors.primary800}
            outlineColor={Colors.primary800}
            contentStyle={styles.textInputContent}
          />
        </View>

        <View style={styles.inputContainer}>
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: Colors.primary800, borderWidth: 1 },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={admissionCategoryList}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Admission Category" : "..."}
            searchPlaceholder="Search Admission Category..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        <View style={[styles.inputContainer, styles.radioGroupContainer]}>
          <Text style={styles.radioGroupLable}>Physically Challanged</Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View>
              <View style={styles.radioBtnContainer}>
                <RadioButton value="yes" />
                <Text style={styles.radioLabelText}>Yes</Text>
              </View>
              <View style={styles.radioBtnContainer}>
                <RadioButton value="no" />
                <Text style={styles.radioLabelText}>No</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>

        <View style={styles.inputContainer}>
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: Colors.primary800, borderWidth: 1 },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={courseOrGroupList}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Course/Group" : "..."}
            searchPlaceholder="Search Course/Group..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Dropdown
            style={[
              styles.dropdown,
              { borderColor: Colors.primary800, borderWidth: 1 },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={mediumList}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Medium" : "..."}
            searchPlaceholder="Search Medium..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        <View style={[styles.inputContainer, styles.radioGroupContainer]}>
          <Text style={styles.radioGroupLable}>Registration Fee Paid</Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View>
              <View style={styles.radioBtnContainer}>
                <RadioButton value="yes" />
                <Text style={styles.radioLabelText}>Yes</Text>
              </View>
              <View style={styles.radioBtnContainer}>
                <RadioButton value="no" />
                <Text style={styles.radioLabelText}>No</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
      </List.Accordion>
    </Card>
  );
};

export default EducationDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  accordionText: {
    fontFamily: "regular",
    fontSize: 14,
  },
  inputContainer: {
    marginRight: 35,
    marginBottom: 20,
  },
  textInputContent: {
    fontFamily: "regular",
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 8,
    fontFamily: "light",
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 8,
    fontFamily: "regular",
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: "regular",
    borderColor: Colors.primary800,
    borderRadius: 4,
  },
  radioGroupContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  radioGroupLable: {
    fontFamily: "regular",
    fontSize: 16,
  },
  radioLabelText: {
    fontFamily: "light",
  },
});
