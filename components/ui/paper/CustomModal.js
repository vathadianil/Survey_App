import * as React from "react";
import { Modal, View, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../Button";
import { Colors } from "../../../constants/styles";

const CustomModal = ({ pickedImage, visible, hideModal }) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: "90%",
                margin: 10,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={[styles.button, { backgroundColor: Colors.black }]}
                onPress={() => hideModal()}
              >
                <Ionicons name="close-circle-outline" size={24} />
              </Button>
            </View>

            <View style={styles.imagePreview}>
              <Image style={styles.image} source={{ uri: pickedImage }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  imagePreview: {
    width: "90%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
