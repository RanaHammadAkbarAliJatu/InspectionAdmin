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

class Content extends Component {
  render() {
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={{ flex: 1 }}>


          <View style={{ flex: 1, width: SCREEN.width - 40, alignSelf: "center" }}>



            <View style={{ width: '85%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>

              <TouchableOpacity

                onPress={() => this.props.navigation.goBack()}>
                <Image
                  style={{ width: 7, height: 13, }}
                  source={require('../../assets/back.png')} />

              </TouchableOpacity>
              <Text style={[styles.itemTxt, { fontSize: 24 }]}>Table of contents</Text>
            </View>



            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, alignSelf: 'center' }}>
              <Image style={{ width: 11, height: 14, marginRight: 5 }} source={require('../../assets/location.png')} />
              <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: '700', color: '#828282' }}>(Location of inspection here)</Text>
            </View>
            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 20, color: '#828282' }}>Table of contents</Text>

            <TouchableOpacity style={styles.tableItem}
              onPress={() => this.props.navigation.navigate("CInspection")}
            >
              <Text style={[styles.itemTxt, { fontWeight: '400', textDecorationLine: 'underline' }]}>Inspection and report guide</Text>
              <Text style={[styles.itemTxt, { fontWeight: '400', textDecorationLine: 'underline' }]}>Page 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tableItem}
                onPress={() => this.props.navigation.navigate("CSummary")}
                >
              <Text style={[styles.itemTxt, { fontWeight: '400', textDecorationLine: 'underline' }]}>Summary report</Text>
              <Text style={[styles.itemTxt, { fontWeight: '400', textDecorationLine: 'underline' }]}>Page 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tableItem}
                onPress={() => this.props.navigation.navigate("CRequirementsGuide")}
                >
              <Text style={[styles.itemTxt, { fontWeight: '400', textDecorationLine: 'underline' }]}>SB-721 Requirements guide</Text>
              <Text style={[styles.itemTxt, { fontWeight: '400', textDecorationLine: 'underline' }]}>Page 3</Text>
            </TouchableOpacity>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("CInspection")}
                style={[styles.itemView, { backgroundColor: '#c9c8db', height: 45, paddingHorizontal: 15, marginBottom: 10 }]}>
                <Text style={styles.itemTxt}>Next page</Text>
                <Image
                  style={{ width: 11, height: 8 }}
                  source={require('../../assets/forward.png')} />
              </TouchableOpacity>

              <Text onPress={() => this.props.navigation.goBack()} style={[styles.itemTxt, { fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }]}>Return to main menu</Text>
            </View>


          </View>
          <View style={{ position: "absolute", height: 139, backgroundColor: "#c9c8db", width: 139, alignSelf: "center", top: SCREEN.height / 2.3, borderRadius: 70, alignItems: "center", justifyContent: 'center', opacity: 0.4 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Logo here</Text>
          </View>
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
    width: '100%',
    alignItems: "center",
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
  },
  itemTxt: {
    fontSize: 12,
    fontWeight: '700',
    color: '#282461',
  },
  round: {
    width: 39,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#c9c8db",
    borderRadius: 30,

  },

  oval: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 30,
    backgroundColor: "#c9c8db",
    borderRadius: 10,

  },
  tableItem: {
    width: '100%',
    alignItems: "center",
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,

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

export default connect(mapStateToProps, mapDispatchToProps)(Content);