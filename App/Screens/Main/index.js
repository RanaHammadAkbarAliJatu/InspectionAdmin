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
} from 'react-native';
import Loader from '../../Components/Loader';
import {LoginForm} from '../../helper/api';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {BLACK, GREY, ORANGE, RED, WHITE} from '../../helper/Color';
import {FONT, SCREEN} from '../../helper/Constant';
import { Platform, StatusBar } from "react-native";
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
            <View style={{flex:1 , alignItems:'center'}}>
            <Image style={{width: '100%', height: SCREEN.height/1.8,resizeMode: 'contain'}} source={require('../../assets/logoscreen.png')}/>
            <Text style={[styles.itemTxt,{marginTop: 30,  textAlign:'center'}]}>Inspection Application</Text>
            <Text style={{
              fontSize:12,
              fontWeight:'500',
              color: '#828282',
              textAlign:'center',
              width: SCREEN.width - 40,
              marginTop: 30
            }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed feugiat neque rhoncus. Sit mi arcu at molestie id enim senectus dui leo. Nibh senectus molestie amet eget leo, nisi. Pharetra vivamus phasellus tristique ac tortor.</Text>
            
            <View style={{flexDirection:'row',marginTop: 30,justifyContent: 'center', width: SCREEN.width - 40}}> 
            {/* <TouchableOpacity 
            onPress={()=> this.props.navigation.navigate("Login",{role: 1})}
            style={styles.Btn}>
              <Text style={[styles.itemTxt,{fontSize: 12}]}>Inspection login</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={[styles.Btn,{backgroundColor:'#282461'}]}  onPress={()=> this.props.navigation.navigate("Login",{role: 2})}>
            <Text style={[styles.itemTxt,{fontSize: 12, color:'white'}]}>Customer login</Text>
            </TouchableOpacity>
            </View>
            </View>
           

       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
  },

  itemTxt:{
    fontSize:36,
    fontWeight:'bold',
    color: '#282461'
  },
  Btn:{
    width: SCREEN.width / 2.4,
    height: 45,
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 2,
    borderColor: '#282461',
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
