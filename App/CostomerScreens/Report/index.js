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
  import {LoginForm} from '../../helper/api';
  import {connect} from 'react-redux';
  import * as userActions from '../../redux/actions/user';
  import {BLACK, GREY, ORANGE, RED, WHITE} from '../../helper/Color';
  import {FONT, SCREEN} from '../../helper/Constant';

class Report extends Component {
  render() {
   const location = this.props.route.params.dataToSend
    return (
      <View style={styles.wrapperView}>
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1, width: SCREEN.width - 40, alignSelf:"center"}}>

            <View style={{flexDirection:'row' ,alignItems:"center", justifyContent:"space-between" ,width:'90%'}}>
            <TouchableOpacity
            onPress={()=> this.props.navigation.goBack()}>
            <Image
            style={{width: 7, height: 13}}
            source={require('../../assets/back.png')}/>
            </TouchableOpacity>
               
            <Text style={[styles.itemTxt,{fontSize: 24}]}>View / Download report</Text>
            </View>

            <Text style={{fontSize:12, fontWeight:'700',color: '#828282', marginTop: 20}}>Inspections</Text>
            
            {location.length > 0 ? location.map((item, i) => (
                            <View style={[styles.itemView, { marginTop: 10 }]}>
                                <View style={styles.round}>
                                    <Text style={styles.itemTxt}>{i + 1}</Text>
                                </View>
                                <Text style={[styles.itemTxt, { marginRight: 20 }]}>{item.status}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={[styles.oval,{marginRight: 12}]}>
                                        <Image style={{ width: 10, height: 13 }} source={require('../../assets/document.png')} />
                                    </View>
                                    <View style={styles.oval}>
                                        <Image style={{ width: 14, height: 10.5 }} source={require('../../assets/eye.png')} />
                                    </View>
                                </View>
                            </View>
                        )) : <View style={[styles.itemView, { justifyContent: 'center' }]}>
                            <Text style={[styles.itemTxt]}>No Location of inspections found</Text>

                        </View>}

        



        <View style={{flex:1, justifyContent:'flex-end'}}>
        <TouchableOpacity
        onPress={()=> this.props.navigation.navigate("Review",{dataToSend: {location}})}
        style={[styles.itemView,{backgroundColor:'#c9c8db', height: 45,paddingHorizontal:15,marginBottom:10}]}>
        <Text style={styles.itemTxt}>View complete report</Text>
        <Image
        style={{width: 21, height: 16.7}}
        source={require('../../assets/eye.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.itemView,{backgroundColor:'#c9c8db', paddingHorizontal:15,height: 45}]}>
        <Text style={styles.itemTxt}>Save complete pdf report</Text>
        <Image
        style={{width: 18, height: 23}}
        source={require('../../assets/document.png')}/>
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
    },
    itemView:{
      width: '100%',
      alignItems:"center",
      justifyContent:'space-between',
      flexDirection:'row',
      borderRadius: 10,
    },
    itemTxt:{
      fontSize:12,
      fontWeight:'700',
      color: '#282461',
    },
    round:{
        width: 39,
        height: 39,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#c9c8db",
        borderRadius: 30,

    },
    
    oval:{
        alignItems:'center',
        justifyContent:'center',
        width: 38,
        height: 30,
        backgroundColor:"#c9c8db",
        borderRadius:10,

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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Report);
