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
  Alert

} from 'react-native';
import Loader from '../../Components/Loader';
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, PURPLE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import Header from '../../Components/Headder/header';
import Validations from '../../helper/Validations';

import countries from '../../constants';
import SelectDropdown from 'react-native-select-dropdown'
class PropertyLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preparedFor: '',
      address1: '',
      address2: '',
      state: '',
      city: '',
      zip_code: '',
      loading: false,
    };
    console.log("constructor")
  }
  componentDidMount() {
    const data = this?.props?.route?.params.data;
    this.setState({ preparedFor: data });
  }

  isFormFilled() {
    let address1 = Validations.checkrequired(this.state.address1);
    let address2 = Validations.checkrequired(this.state.address2);
    let state = Validations.checkPassword(
      this.state.state,
    );
    let zip_code = Validations.checkrequired(this.state.zip_code);
    let city = Validations.checkrequired(this.state.city);

    if (
      address1 &&
      state &&
      zip_code &&
      city
    ) {
      return true;
    }
    if (!address1) {
      alert('Invali Name');
    } else if (!state) {
      alert('Invalid State');
    } else if (!zip_code) {
      alert('Invalid Zip Code');
    } else if (!city) {
      alert('Invalid City');
    }
    return false;
  }

  Pass() {
    if (this.isFormFilled()) {
      this.props.navigation.navigate("ManagementContact", {
        data: {
          preparedFor: this.state.preparedFor,
          address1t: this.state.address1,
          address2: this.state.address2,
          propstate: this.state.state,
          zip_code: this.state.zip_code,
          propcity: this.state.city
        }
      })
    }
  }
  componentWillUnmount() {
    console.log("componentWillUnmount")
  }
  render() {
    return (
      <View

        style={styles.wrapperView}>
        <Header
          leftPress={() => this.props.navigation.goBack()}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingHorizontal: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>

            <Text style={[styles.itemTxt, { marginTop: 30 }]}>Property location</Text>
            <Text style={{ fontSize: 12, color: '#828282', fontWeight: 'bold', marginTop: 30 }}>New inspection step 2/5</Text>


            <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
              <View style={{ height: 2, width: '40%', backgroundColor: PURPLE.dark, borderRadius: 5 }} />
              <View style={{ height: 2, width: '60%', backgroundColor: '#F2F2F2', borderRadius: 5 }} />
            </View>


            <View style={{ flex: 1 }}>
              <ScrollView
                bounces={false}
                style={{ flex: 1 }}>

                <TextInput
                  placeholderTextColor={'lightgrey'}
                  onChangeText={(value) => this.setState({ address1: value })}
                  value={this.state.address1}
                  placeholder='Address line 1'
                  style={[styles.TextInput, { marginTop: 30 }]}
                />
                <TextInput
                  placeholderTextColor={'lightgrey'}
                  onChangeText={(value) => this.setState({ address2: value })}
                  value={this.state.address2}
                  placeholder='Address line 2'
                  style={styles.TextInput}
                />
                <View>
                  <Image
                    style={{ height: 20, width: 10, resizeMode: 'contain', position: 'absolute', right: 20, top: 12 }}
                    source={require('../../assets/down.png')} />
                  <SelectDropdown
                    data={countries}
                    defaultButtonText={"Select State"}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                      this.setState({ state: selectedItem })
                    }}
                    buttonStyle={styles.TextInput}
                  />
                </View>
                <View>
                  <Image
                    style={{ height: 20, width: 10, resizeMode: 'contain', position: 'absolute', right: 20, top: 12 }}
                    source={require('../../assets/down.png')} />
                  <TextInput
                    placeholderTextColor={'lightgrey'}
                    onChangeText={(value) => this.setState({ city: value })}
                    value={this.state.city}
                    placeholder='City'
                    style={styles.TextInput}
                  />
                </View>
                <TextInput
                  placeholderTextColor={'lightgrey'}
                  onChangeText={(value) => this.setState({ zip_code: value })}
                  value={this.state.zip_code}
                  placeholder='Zip code'
                  keyboardType='numeric'
                  style={styles.TextInput}
                />
              </ScrollView>
            </View>



            <View style={{ flex: 0.15, justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => this.Pass()}
                style={[styles.Btn, { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between' }]}>
                <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>Next</Text>

                <Image style={{ width: 11, height: 5 }} source={require('../../assets/arrowup.png')} />
              </TouchableOpacity>

            </View>
          </View>

        </SafeAreaView>

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
    color: '#282461'
  },
  TextInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: 'lightgrey',
    alignItems: 'center',
    borderRadius: 10,
    color: 'black',
    paddingLeft: 40,
    marginBottom: 10,

  },
  Btn: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282461',
    borderRadius: 10,
    marginBottom: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(PropertyLocation);
