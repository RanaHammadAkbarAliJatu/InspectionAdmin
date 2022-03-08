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
  ImageBackground
} from 'react-native';
import Loader from '../../Components/Loader';
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, PURPLE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import Header from '../../Components/Headder/header';
import ImagePicker from 'react-native-image-crop-picker';
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
    };
  }
  picker() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image, "image")
      RNFS.readFile(image.path, 'base64')
        .then(res => {
          console.log(res);
          this.setState({
            Image: res,
            showImage: {
                uri: image.path,
                type: image.mime,
                name: image.path.substring(image.path.lastIndexOf('/') + 1),
              }
          });
        });
      // let image_data = {
      //   uri: image.path,
      //   type: image.mime,
      //   name: image.path.substring(image.path.lastIndexOf('/') + 1),
      // };
      // this.setState({
      //   Image: image_data,
      // });
    });
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true
    // }).then(image => {

    //   let image_data = {
    //     uri: image.path,
    //     type: image.mime,
    //     name: image.path.substring(image.path.lastIndexOf('/') + 1),
    //   };
    //   this.setState({
    //     Image: image_data,
    //   });

    // });

    this.setState({ state: false });
  }

  componentDidMount() {
    const data = this?.props?.route?.params.data;
    console.log(data);
    this.setState({ BackData: data });
  }



  render() {
    return (
      <View style={styles.wrapperView}>
        <ImageBackground
          // source={{ uri: "https://reactjs.org/logo-og.png" }}
          source={this.state.state ? require('../../assets/Pic.png') : { uri: this.state.showImage.uri }}
          resizeMode="cover"
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
                onPress={() => this.picker()}
                style={styles.Btn}>
                <Text style={[styles.itemTxt, { fontSize: 12, color: PURPLE.dark }]}>Retake photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('PreparedBy', {
                  data: {
                    backEnd: this.state.BackData,
                    image: this.state.Image
                  }
                })}
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
