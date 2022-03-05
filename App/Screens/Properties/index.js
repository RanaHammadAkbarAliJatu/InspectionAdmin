/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disableno-alert */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Loader from '../../Components/Loader';
import {LoginForm} from '../../helper/api';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {BLACK, GREY, ORANGE, PURPLE, RED, WHITE} from '../../helper/Color';
import {FONT, isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import Header from '../../Components/Headder/header';

class Properties extends Component {
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
       
        <SafeAreaView style={{flex: 1}}>
            <Text style={[styles.itemTxt,{textAlign:'center'}]}>Properties for inspection</Text>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Image 
            style={{width: SCREEN.width - 190, height: SCREEN.height / 3.2, resizeMode:'contain'}}
            source={require('../../assets/properties.png')}/>
            <Text style={[styles.itemTxt,{textAlign:'center', fontSize: 34}]}>No property found!</Text>
            <Text style={{fontSize: 12, color: '#828282', fontWeight:'500', textAlign:'center', marginTop: 20, width: SCREEN.width - 150}}>No property has been added. Please use the Add button to get started.</Text>
        </View>
        <View style={{flex:0.11,alignItems:'flex-end' ,justifyContent:'flex-end' }}>
            <TouchableOpacity 
            onPress={()=> this.props.navigation.navigate('PreparedFor')}
            style={{alignItems:'center',marginRight: 20 ,justifyContent:'center', backgroundColor:PURPLE.dark,height: 73, width: 73, borderRadius: 40,}}>
            <Image style={{width: 27, height: 27}} source={require('../../assets/plus.png')}/>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor:'white'
  },

  itemTxt:{
    fontSize:24,
    fontWeight:'bold',
    color: '#282461'
  },
  TextInput:{
      width: '100%',
      height: 45,
      borderWidth: 1,
      borderColor: 'lightgrey',
     alignItems:'center',
     borderRadius: 10,
     paddingLeft: 40
  },
  Btn:{
    width: '100%',
    height: 45,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#282461',
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
      dispatch(userActions.setUser({user, access_token, role})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
