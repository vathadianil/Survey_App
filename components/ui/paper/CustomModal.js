import * as React from "react";
import { Modal, View, StyleSheet, Image } from "react-native";
import { Colors } from "../../../constants/styles";
import AppBar from "../AppBar";

const CustomModal = ({ pickedImage, visible, hideModal }) => {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AppBar onPress={() => hideModal()} style={{ marginBottom: 12 }} />

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
    alignItems: "flex-start",
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
