/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disableno-alert */
import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert
} from 'react-native';
import Loader from '../../Components/Loader';
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, PURPLE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import Header from '../../Components/Headder/header';
import ImagePicker from 'react-native-image-crop-picker';
import CamraModel from '../../Components/CamraModel';
import RNFS from 'react-native-fs';
class TakePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BackData: '',
      state: true,
      loading: false,
      Image: '',
      showImage: '',
      ImageModalVisible: false,
      type: 0
    };
  }
  // picker() {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //   }).then(image => {
  //     console.log(image, "image")
  //     RNFS.readFile(image.path, 'base64')
  //       .then(res => {
  //         console.log(res);
  //         this.setState({
  //           Image: res,
  //           showImage: {
  //             uri: image.path,
  //             type: image.mime,
  //             name: image.path.substring(image.path.lastIndexOf('/') + 1),
  //           }
  //         });
  //       });
  //     // let image_data = {
  //     //   uri: image.path,
  //     //   type: image.mime,
  //     //   name: image.path.substring(image.path.lastIndexOf('/') + 1),
  //     // };
  //     // this.setState({
  //     //   Image: image_data,
  //     // });
  //   });
  //   // ImagePicker.openPicker({
  //   //   width: 300,
  //   //   height: 400,
  //   //   cropping: true
  //   // }).then(image => {

  //   //   let image_data = {
  //   //     uri: image.path,
  //   //     type: image.mime,
  //   //     name: image.path.substring(image.path.lastIndexOf('/') + 1),
  //   //   };
  //   //   this.setState({
  //   //     Image: image_data,
  //   //   });

  //   // });

  //   this.setState({ state: false });
  // }

  componentDidMount() {
    const data = this?.props?.route?.params.data;
    console.log(data);
    this.setState({ BackData: data });
    if (this?.props?.route?.params?.change) {
      const { PreparedForData,
        PropertyLocationData,
        ManagementContactData,
        TakePictureData,
        PreparedByData } = this?.props?.route?.params
      this.setState({
        showImage: TakePictureData.image
      })
    }
  }

  picker(type) {
    this.setState({ ImageModalVisible: true, type: type })
  }
  update() {
    const { PreparedForData,
      PropertyLocationData,
      ManagementContactData,
      TakePictureData,
      PreparedByData } = this?.props?.route?.params
    this.props.navigation.navigate("Review", {
      dataToSend: {
        PreparedForData: PreparedForData,
        PropertyLocationData: PropertyLocationData,
        ManagementContactData: ManagementContactData,
        PreparedByData: PreparedByData,
        TakePictureData: {
          image: this.state.showImage,
          sendimage: this.state.Image,
        }
      }
    })
  }
  render() {
    return (
      <View style={styles.wrapperView}>
        <CamraModel
          type={this.state.type}
          modalVisible={this.state.ImageModalVisible}
          modalClose={() => this.setState({ ImageModalVisible: false })}
          sendImage={(type, image) => {
            RNFS.readFile(image.path, 'base64')
              .then(res => {
                this.setState({
                  Image: res,
                  showImage: {
                    uri: image.path,
                    type: image.mime,
                    name: image.path.substring(image.path.lastIndexOf('/') + 1),
                  }
                });
              });
            this.setState({ state: false, ImageModalVisible: false });
          }}
        />
        <Header
          leftPress={() => {
            this.props.navigation.goBack()
          }}
        />
        <ImageBackground
          // source={{ uri: "https://reactjs.org/logo-og.png" }}
          source={this.state.state ? require('../../assets/logoscreen.png') : { uri: this.state.showImage.uri }}
          resizeMode={this.state.state ? "contain" : "cover"}
          style={{ flex: 1, justifyContent: 'space-between', width: SCREEN.width, height: SCREEN.height, resizeMode: "contain", paddingVertical: 12 }}>
          <View style={{ alignItems: "center" }}>

            <Text style={styles.itemTxt}>Take picture</Text>
            {/* <Text style={[styles.itemTxt, { fontSize: 12, marginTop: 10 }]}>New inspection step 4/5</Text> */}
          </View>

          {/* <Image
          style={{ width: SCREEN.width, height: SCREEN.height, resizeMode: "contain", position: 'absolute' }}
          source={this.state.state ? require('../../assets/Pic.png') : { uri: this.state.Image.uri }} /> */}

          <View style={{ justifyContent: 'flex-end' }}>



            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: SCREEN.width - 40, alignSelf: 'center' }}>
              <TouchableOpacity
                onPress={() => this.picker(0)}
                style={styles.Btn}>
                <Text style={[styles.itemTxt, { fontSize: 12, color: PURPLE.dark }]}>{this.state.Image ? "Retake" : "Take"} photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.Image) {
                    if (this?.props?.route?.params?.change) {
                      this.update()
                    } else {
                      this.props.navigation.navigate('PreparedBy', {
                        data: {
                          backEnd: this.state.BackData,
                          image: this.state.Image,
                          PreparedForData: this?.props?.route?.params?.data?.PreparedForData,
                          PropertyLocationData: this?.props?.route?.params?.data?.PropertyLocationData,
                          ManagementContactData: this?.props?.route?.params?.data?.ManagementContactData,
                          TakePictureData: {
                            image: this.state.showImage,
                            sendimage: this.state.Image,

                          }
                        }
                      })
                    }


                  } else {
                    alert("Capture an image to proceed")
                  }
                }}
                style={[styles.Btn, { backgroundColor: '#282461' }]}>
                <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>Keep image</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: 'white'
  },

  itemTxt: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white'
  },
  TextInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: 'lightgrey',
    alignItems: 'center',
    borderRadius: 10,
    paddingLeft: 40,
    marginBottom: 10,

  },
  Btn: {
    width: '45%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  }
});
function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
    role: state.user.role,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, access_token, role) =>
      dispatch(userActions.setUser({ user, access_token, role })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TakePicture);
