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
    FlatList,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal
} from 'react-native';
import Loader from '../../Components/Loader';
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, PURPLE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import Header from '../../Components/Headder/header';

class FinishInspection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            modal: false,
            checkBox: false,
        };
    }

    render() {
        return (
            <View style={styles.wrapperView}>
      
                <SafeAreaView style={{ flex: 1 }}>
                   <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                   <Image
                   style={{ width: SCREEN.width - 190, height: isIphoneXorAbove ? SCREEN.height / 3 :SCREEN.height / 2.5 }}
                source={require('../../assets/completed.png')}
                />
                

                <Text style={[styles.itemTxt,{fontSize: 34}]}>Inspection added!</Text>
                <Text style={[styles.greytxt,{textAlign:'center', marginTop: 20 ,width: SCREEN.width / 1.5}]} >Inspection record has been updated successfully.</Text>
                </View>
                <View style={{alignItems:'center' }}>
                   
                   <TouchableOpacity 
                   onPress={()=> alert("save as pdf")}
                   style={[styles.itemView, { backgroundColor: '#c9c8db', paddingHorizontal: 15, height: 45 }]}>
                       <Text style={styles.itemTxt}>Save a pdf of this property inspections</Text>
                       <Image
                           style={{ width: 18, height: 23 }}
                           source={require('../../assets/pdf2.png')} />
                   </TouchableOpacity>

                   <TouchableOpacity
                       onPress={() => this.props.navigation.navigate('Main')}
                       style={[styles.Btn, { width: '90%'}]}>
                       <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>Finish</Text>
                   </TouchableOpacity>

                <Text
                onPress={()=> alert("Add Other Inspection")}
                style={[styles.itemTxt,{marginTop: 40,marginBottom: 20}]}>Add another inspection</Text>
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
        width: '90%',
        alignItems: "center",
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 10,
        alignSelf: 'center'
    },
    itemTxt: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#282461',
    },
    textInput: {
        width: SCREEN.width - 40,
        height: 100,
        borderWidth: 1,
        borderColor: 'lightgrey',
        paddingLeft: 10,
        borderRadius: 10,
        marginTop: 20
    },
    Btn: {
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#282461',
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 15,

    },
    greytxt: {
        fontSize: 12,
        color: '#828282',
        fontWeight: 'bold',

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

export default connect(mapStateToProps, mapDispatchToProps)(FinishInspection);

