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
    TextInput
} from 'react-native';
import Loader from '../../Components/Loader';
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, PURPLE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:'',
            loading: false,
        };
    }
    componentDidMount(){
        const data = this?.props?.route?.params;
        console.log(data);
        this.setState({data:data})
      }
    render() {
        return (
            <View
                style={styles.wrapperView}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', width: '60%', alignItems: "center", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                        <Image
                            style={{ width: 7, height: 13, marginLeft: 20 }}
                            source={require('../../assets/back.png')} />
                            </TouchableOpacity>

                        <Text style={[styles.itemTxt, { fontSize: 24 }]}>Review</Text>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 12, color: '#828282', fontWeight: 'bold', marginTop: 20 }}>Prepared for</Text>
                            <Text style={[styles.itemTxt, { marginTop: 10 }]}>{this.state.data && this.state.data.dataToSend.owner_name}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.address}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.state}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.city}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.country_code}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.phone} </Text>

                            <Image
                                style={{ width: SCREEN.width - 40, height: SCREEN.height / 3, marginTop: 30, borderRadius: 10 }}
                                source={require('../../assets/pic3.png')} />


                            <Text style={{ fontSize: 12, color: '#828282', fontWeight: 'bold', marginTop: 20 }}>Property location</Text>
                            <Text style={[styles.itemTxt, { marginTop: 10 }]}>{this.state.data && this.state.data.dataToSend.property_address}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.property_address2}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && (this.state.data.dataToSend.property_city+" "+this.state.data.dataToSend.property_state+" "+this.state.data.dataToSend.property_zip_code)}</Text>


                            <View style={{ width: SCREEN.width - 40, height: 172, borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey', marginTop: 30, alignItems: "center", }}>

                                <Text style={{ fontSize: 12, color: '#828282', fontWeight: 'bold', marginTop: 30 }}>Management contact</Text>
                                <Text style={[styles.itemTxt, { marginTop: 10 }]}>{this.state.data && this.state.data.dataToSend.management_name}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.management_address}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.management_phone}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.management_email}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>Site contact</Text>
                            </View>

                            <View style={{ width: SCREEN.width - 40, height: 172, borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey', marginTop: 30, alignItems: "center", }}>

                                <Text style={{ fontSize: 12, color: '#828282', fontWeight: 'bold', marginTop: 30 }}>Prepared by</Text>
                                <Text style={[styles.itemTxt, { marginTop: 10 }]}>{this.state.data && this.state.data.dataToSend.pfor_buisness_name}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.pfor_phone} </Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.pfor_email}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.pfor_name}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{this.state.data && this.state.data.dataToSend.pfor_date}</Text>
                            </View>
                       
                        <TouchableOpacity 
            onPress={()=> this.props.navigation.navigate('PropertiesforInspection')}
            style={[styles.Btn,{marginTop: 50}]}>
            <Text style={[styles.itemTxt,{fontSize: 12, color:'white'}]}>Done</Text>

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
        backgroundColor: 'white'
    },

    itemTxt: {
        fontSize: 12,
        fontWeight: '500',
        color: '#282461',
    },
    TextInput: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        borderRadius: 10,
        paddingLeft: 40,
        marginBottom: 10,

    },
    Btn: {
        width: '90%',
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
        Ins_id: state.user.Ins_id,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        callApi: (user, access_token, role) =>
            dispatch(userActions.setUser({ user, access_token, role })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
