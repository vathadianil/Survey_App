import { StyleSheet, View, Text } from "react-native";
import { List, Card, TextInput, RadioButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { useState } from "react";

const PersonalDetails = () => {
  const [value, setValue] = useState("male");
  return (
    <Card mode="elevated" style={styles.container}>
      <List.Accordion
        id="1"
        titleStyle={styles.accordionText}
        title="Personal Details"
        left={(props) => (
          <Ionicons {...props} name="person-add-outline" size={20} />
        )}
      >
        <View style={styles.inputContainer}>
          <TextInput
            label="Student Name(As Per SSC)"
            mode="outlined"
            activeOutlineColor={Colors.primary800}
            outlineColor={Colors.primary800}
            contentStyle={styles.textInputContent}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Father Name"
            mode="outlined"
            activeOutlineColor={Colors.primary800}
            outlineColor={Colors.primary800}
            contentStyle={styles.textInputContent}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Motehr Name"
            mode="outlined"
            activeOutlineColor={Colors.primary800}
            outlineColor={Colors.primary800}
            contentStyle={styles.textInputContent}
          />
        </View>
        <View style={[styles.inputContainer, styles.radioGroupContainer]}>
          <Text style={styles.radioGroupLable}>Gender</Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View style={styles.radioGroupContainer}>
              <View style={styles.radioBtnContainer}>
                <RadioButton value="male" />
                <Text style={styles.radioLabelText}>Male</Text>
              </View>
              <View style={styles.radioBtnContainer}>
                <RadioButton value="female" />
                <Text style={styles.radioLabelText}>Female</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Religion"
            mode="outlined"
            activeOutlineColor={Colors.primary800}
            outlineColor={Colors.primary800}
            contentStyle={styles.textInputContent}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Mother Tongue"
            mode="outlined"
            activeOutlineColor={Colors.primary800}
            outlineColor={Colors.primary800}
            contentStyle={styles.textInputContent}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Caste"
            mode="outlined"
            activeOutlineColor={Colors.primary800}
            outlineColor={Colors.primary800}
            contentStyle={styles.textInputContent}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Sub Caste"
            mode="outlined"
            activeOutlineColor={Colors.primary800}
            outlineColor={Colors.primary800}
            contentStyle={styles.textInputContent}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Mobile Number"
            mode="outlined"
            activeOutlineColor={Colors.primary800}
            outlineColor={Colors.primary800}
            contentStyle={styles.textInputContent}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Date Of Birth"
            mode="outlined"
            activeOutlineColor={Colors.primary800}
            outlineColor={Colors.primary800}
            contentStyle={styles.textInputContent}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Aadhar Number"
            mode="outlined"
            activeOutlineColor={Colors.primary800}
            outlineColor={Colors.primary800}
            contentStyle={styles.textInputContent}
          />
        </View>
      </List.Accordion>
    </Card>
  );
};

export default PersonalDetails;

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
  textInputContent: {
    fontFamily: "regular",
  },
});
