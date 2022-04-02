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
import Validations from '../../helper/Validations'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  isFormFilled() {
    let check_email = Validations.checkEmail(this.state.email.replace(/\s/g, ''));
    let check_Password = Validations.checkrequired(this.state.password);
  

    if (
      check_email &&
      check_Password

    ) {
      return true;
    }
    if (!check_email) {
      alert('Invalid Email');
    }
     else if (!check_Password) {
      alert('Password Length should be Greater than 3');
     }
    return false;
  }

  async Login() {
    const {role} = this?.props?.route?.params

    this.setState({loading: true});
    let dataToSend = {
      email: this.state.email,
      password: this.state.password,
      role: role == 1 ? 'inspection' : 'customer'
    };
    if (this.isFormFilled()) {
      try {
      
      await LoginForm(dataToSend).then(response => {
        console.log(response,"response")
        if (response?.status === 200 && !response.data.error) {

          if(response.data.message === "This Email Address Does Not Exist In Our System."){
            alert("Email Does Not Exist")
          }
          else if(response.data.message ==="Login Failed, Password Is Incorrect."){
            alert("Password is Incorrect")
          }
          else if(response.data.message ==="Role is not found"){
            alert("Role is not found")
          }
          else{
            this.props.callApi(
            response.data.user,
            response.data.token.accessToken,
          );
          if(role == 1){
           this.props.navigation.navigate('PropertiesforInspection') 
          }else{
            this.props.navigation.navigate('CMain', {dataToSend: response.data.data}) 
          }
          }
          this.setState({loading: false});
        } 
        else{
          alert("Some thing Went Wrong")
        }
      });
    } catch (e) {
    console.log('Error')
    this.setState({loading: false});

    }

    }
    this.setState({loading: false});
  }
  
  render() {
    const {role} = this?.props?.route?.params
    console.log(role)
    return (
      <SafeAreaView style={{flex: 1}}>
      <View
    
        style={styles.wrapperView}>
            <Header
            leftPress={()=> this.props.navigation.goBack()}
            />
        <View style={{flex:1,paddingHorizontal:20 ,borderTopRightRadius: 10,borderTopLeftRadius:10}}>

        <Text style={[styles.itemTxt,{marginTop: 30}]}>{role == 1 ?  "Inspection" : "Customer"} Login</Text>
        <View style={{height:2, width: 42, backgroundColor:PURPLE.dark, marginTop: 13}}/>
        <Text style={{fontSize: 12, color: '#828282', fontWeight:'500', marginTop: 20}}></Text>
        
        <View style={{marginTop: 20}}>
        <Image 
        style={{width: 14, height:10, resizeMode:'contain', position:'absolute', top:17, left: 15}}
        source={require('../../assets/email.png')}/>
        <TextInput
        style={styles.TextInput}
        onChangeText={(value)=> this.setState({email: value})}
        placeholder='Email address'
        placeholderTextColor={'lightgrey'}
        />
        </View>


        <View style={{marginTop: 20}}>
        <Image 
        style={{width: 12, height:17, resizeMode:'contain', position:'absolute', top:17, left: 15}}
        source={require('../../assets/pass.png')}/>
        <TextInput
        style={styles.TextInput}
        onChangeText={(value)=> this.setState({password: value})}
        placeholder='Password'
        secureTextEntry={true}
        placeholderTextColor={'lightgrey'}
        />
        </View>
        <View style={{flex:1, justifyContent:'flex-end'}}>
            <TouchableOpacity
            onPress={()=> {
              this.Login()
            }}
            style={styles.Btn}>
            <Text style={[styles.itemTxt,{fontSize: 12, color:'white'}]}>Login</Text>
            </TouchableOpacity>

            <Text style={{fontSize: 12,marginBottom: 20 ,textAlign:'center',color: '#828282', fontWeight:'500', marginTop: 20}}>Don’t have an account? <Text onPress={()=> this.props.navigation.navigate("SignUp",{role: role})} style={[styles.itemTxt,{fontSize:12}]}>Sign up.</Text></Text>
        </View> 
        </View>

        {this.state.loading && <Loader loading={this.state.loading} />}
      </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor:'white'
  },

  itemTxt:{
    fontSize:34,
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
    Ins_id: state.user.Ins_id
  };
}
const mapDispatchToProps = dispatch => {
  return {
    callApi: (user, access_token) =>
      dispatch(userActions.setUser({user, access_token})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
