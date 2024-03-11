import { StyleSheet, View } from "react-native";
import { List, Card, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { useState } from "react";
import CustomInput from "./ui/paper/CustomInput";
import CustomRadio from "./ui/paper/CustomRadio";

const PersonalDetails = () => {
  const [gender, setGender] = useState("male");

  const onGenderValueChange = (newValue) => {
    setGender(newValue);
  };

  return (
    <Card mode="elevated" style={styles.container}>
      <List.Accordion
        id="one"
        titleStyle={[styles.accordionText]}
        rippleColor={Colors.primary400}
        title="Personal Details"
        left={(props) => (
          <Ionicons {...props} name="person-add-outline" size={20} />
        )}
      >
        <CustomInput
          label={"Student Name(As Per SSC)"}
          style={styles.inputContainer}
        />
        <CustomInput label={"Father Name"} style={styles.inputContainer} />
        <CustomInput label={"Motehr Name"} style={styles.inputContainer} />
        <CustomRadio
          label={"Gender"}
          style={styles.inputContainer}
          value={gender}
          onValueChange={onGenderValueChange}
          data={[
            { value: "male", displayText: "Male" },
            { value: "female", displayText: "Female" },
          ]}
        />

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

  textInputContent: {
    fontFamily: "regular",
  },
});
