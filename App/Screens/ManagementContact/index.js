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
  TextInput,
  Alert
} from 'react-native';
import Loader from '../../Components/Loader';
import {LoginForm} from '../../helper/api';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {BLACK, GREY, ORANGE, PURPLE, RED, WHITE} from '../../helper/Color';
import {FONT, isIphoneXorAbove, SCREEN} from '../../helper/Constant';
import Header from '../../Components/Headder/header';
import Validations from '../../helper/Validations';

class ManagementContact extends Component {
  constructor(props) {
    super(props);
   
  }
  state = {
    manage_name: '',
    manage_address: '',
    manage_phone: '',
    manage_email: '',
    BackData:'',
    manage_siteContact:'',
    loading: false,
  };
  componentDidMount(){
    const data = this?.props?.route?.params.data;
    console.log(data);
    this.setState({BackData:data});
    if (this?.props?.route?.params?.change) {
      const { PreparedForData,
        PropertyLocationData,
        ManagementContactData,
        TakePictureData,
        PreparedByData } = this?.props?.route?.params
      this.setState({
        backdata:ManagementContactData.BackData,
        manage_name: ManagementContactData.manage_name,
        manage_address: ManagementContactData.manage_address,
        manage_phone: ManagementContactData.manage_phone,
        manage_email: ManagementContactData.manage_email,
        manage_siteContact: ManagementContactData.manage_siteContact

      })
    }
  }
  isFormFilled() {
    let manage_name = Validations.checkrequired(this.state.manage_name);
    let manage_address = Validations.checkrequired(this.state.manage_address);
    let manage_phone = this.state.manage_phone
    let manage_email =  this.state.manage_email
    let manage_siteContact = Validations.checkrequired(this.state.manage_siteContact);

    if (
      manage_name &&
      manage_address &&
      manage_phone &&
      manage_email &&
      manage_siteContact 

    ) {
      return true;
    }
    if (!manage_name) {
      alert('Invali Name');
    } else if (!manage_address) {
      alert('Invalid address');
    } else if (!manage_email) {
      alert('Invalid Email');
    } else if (!manage_phone) {
      alert('Invalid Phone');
    } else if (!manage_email) {
      alert('Invalid Email');
    } else if (!manage_siteContact) {
      alert('Invalid Site Contact');
    } 
    return false;
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
        ManagementContactData:{
          backdata:this.state.BackData,
          manage_name: this.state.manage_name,
          manage_address: this.state.manage_address,
          manage_phone: this.state.manage_phone,
          manage_email: this.state.manage_email,
          manage_siteContact: this.state.manage_siteContact
        },
        TakePictureData: TakePictureData,
        PreparedByData: PreparedByData,
      }
    })

  }
  Pass(){
    if(this.isFormFilled()){
      this.props.navigation.navigate("TakePicture",{data:{
        backdata:this.state.BackData,
        manage_name: this.state.manage_name,
        manage_address: this.state.manage_address,
        manage_phone: this.state.manage_phone,
        manage_email: this.state.manage_email,
        PreparedForData:this?.props?.route?.params?.data?.PreparedForData,
        PropertyLocationData: this?.props?.route?.params?.data?.PropertyLocationData,
        ManagementContactData:{
          backdata:this.state.BackData,
          manage_name: this.state.manage_name,
          manage_address: this.state.manage_address,
          manage_phone: this.state.manage_phone,
          manage_email: this.state.manage_email,
          manage_siteContact: this.state.manage_siteContact
        }
      }})
    }
  }
  
  render() {
    return (
      <View
        style={styles.wrapperView}>
            <Header
            show={this?.props?.route?.params?.change ? false: true}
             leftPress={() =>{
              this.props.navigation.goBack()
              }}
            />
        <SafeAreaView style={{flex: 1}}>
        <View style={{flex:1,paddingHorizontal:20 ,borderTopRightRadius: 10,borderTopLeftRadius:10}}>

        <Text style={[styles.itemTxt,{marginTop: 30}]}>Management contact</Text>
        <Text style={{fontSize: 12, color: '#828282', fontWeight:'bold', marginTop: 30}}>New inspection step 3/5</Text>
        
        
        <View style={{flexDirection:'row', marginTop: 20, width:'100%'}}>
        <View style={{height:2, width: '60%', backgroundColor:PURPLE.dark, borderRadius:5}} />
        <View style={{height:2, width: '40%', backgroundColor:'#F2F2F2', borderRadius:5}} />
        </View>
       

        <View style={{flex:1}}>
        <ScrollView 
        bounces={false}
        style={{flex:1}}>
        
        <TextInput
        onChangeText={(value)=> this.setState({manage_name:value})}
        value={this.state.manage_name}
        placeholder='Name'
        style={[styles.TextInput,{marginTop: 30}]}
        />
          <TextInput
           onChangeText={(value)=> this.setState({manage_address:value})}
        value={this.state.manage_address}
        placeholder='Address'
        style={styles.TextInput}
        />

        <TextInput
         onChangeText={(value)=> this.setState({manage_phone:value})}
        value={this.state.manage_phone}
        keyboardType='numeric'
        placeholder='00 000 0000'
        style={styles.TextInput}
        />

  
        <TextInput
         onChangeText={(value)=> this.setState({manage_email:value})}
        value={this.state.manage_email}
        placeholder='Email address'
        style={styles.TextInput}
        />


          <TextInput
           onChangeText={(value)=> this.setState({manage_siteContact:value})}
        value={this.state.manage_siteContact}
        placeholder='Site contact'
        style={styles.TextInput}
        />

        </ScrollView>
        </View>
    
        

        <View style={{flex:0.15 ,justifyContent:'flex-end'}}>
            <TouchableOpacity 
             onPress={() => {
              var  that = this
              if(this?.props?.route?.params?.change){
                if (that?.isFormFilled()) {//chnge

                  that.update()
  }
              }else{
                this.Pass()
              }
                          
                        }}
            style={[styles.Btn,{flexDirection:'row', paddingHorizontal: 20,justifyContent:'space-between'}]}>
            <Text style={[styles.itemTxt,{fontSize: 12, color:'white'}]}>{this?.props?.route?.params?.change ? "Update" : "Next"}</Text>

            <Image style={{width: 11, height: 5}} source={require('../../assets/arrowup.png')}/>
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
     paddingLeft: 40,
     marginBottom: 10,
     
  },
  Btn:{
    width: '100%',
    height: 45,
    alignItems:'center',
    justifyContent:'center',
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
      dispatch(userActions.setUser({user, access_token, role})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagementContact);
