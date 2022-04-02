import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";


class App extends Component {
  openPicker(type) {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then(image => {
      this.savePicture(image.path)
      this.props.sendImage(type, image)
    });
  }
  openCamera(type) {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
      this.savePicture(image.path)
      this.props.sendImage(type, image)
    });
  }
  async  hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  
  async  savePicture(tag) {
    if (Platform.OS === "android" && !(await this.hasAndroidPermission())) {
      return;
    }
  
    CameraRoll.save(tag, { type:"photo", album: "inspection" })
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          this.props.modalClose()
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, { color: 'black', fontWeight: 'bold' }]}>Select Image</Text>
            <Pressable
              onPress={() => this.openCamera(this.props.type)}
            >
              <Text style={styles.modalText}>Take photo...</Text>
            </Pressable>
            <Pressable
              onPress={() => this.openPicker(this.props.type)}
            >
              <Text style={styles.modalText}>Choose from Library</Text>
            </Pressable>

            <Pressable
              onPress={() => this.props.modalClose()}
            >
              <Text style={[styles.modalText, { color: 'black', fontWeight: 'bold', textAlign: 'right' }]}>cancel</Text>

            </Pressable>

          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginVertical: 15,
    textAlign: "center",
    color: 'black', 
  }
});

export default App;