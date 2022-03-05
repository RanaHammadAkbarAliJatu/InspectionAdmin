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
} from 'react-native';
import Loader from '../../Components/Loader';
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, RED, WHITE } from '../../helper/Color';
import { FONT, SCREEN } from '../../helper/Constant';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  render() {
    return (
      <View

        style={styles.wrapperView}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView bounces={false} style={{ flex: 1 }}>


            <View style={{ flex: 1, width: SCREEN.width - 40, alignSelf: "center", alignItems: 'center' }}>
              <Image
                style={{ width: '100%', height: SCREEN.height / 2, borderRadius: 10, marginBottom: 10 }}
                source={require('../../assets/Pic.png')} />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("PropertiesforInspection")}
                style={styles.itemView}>
                <Text style={styles.itemTxt}>Create and Locate Inspection</Text>
                <Image
                  style={{ width: 14, height: 11 }}
                  source={require('../../assets/eye.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Summary")}
                style={styles.itemView}>
                <Text style={styles.itemTxt}>View List of All Inspection</Text>
                <Image
                  style={{ width: 12, height: 12 }}
                  source={require('../../assets/time.png')} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemView}>
                <Text style={styles.itemTxt}>Leave us a Message</Text>
                <Image
                  style={{ width: 12, height: 12 }}
                  source={require('../../assets/message.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Main')}>
              <Text style={[styles.itemTxt, { marginTop: 30, marginBottom: 20, color: 'red' }]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
  },
  itemView: {
    width: SCREEN.width - 40,
    height: 45,
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: "#c9c8db",
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 10,
  },
  itemTxt: {
    fontSize: 12,
    fontWeight: '700',
    color: '#282461'
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
