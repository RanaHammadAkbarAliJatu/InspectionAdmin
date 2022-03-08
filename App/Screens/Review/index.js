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
            data: '',
            loading: false,
            prepared_for: {},
            property_location: {},
            management_contact: {},
            prepared_by: {},
            image: ''
        };
    }
    componentDidMount() {
        // const data = this?.props?.route?.params;
        const data = this?.props?.route?.params.dataToSend;

        this.setState({
            data: data,
            prepared_for: data.prepared_for,
            property_location: data.property_location,
            management_contact: data.management_contact,
            prepared_by: data.prepared_by,
            image: data?.image?.image_url
        })
    }
    render() {
        const { 
            prepared_for,
            property_location,
            management_contact, 
            prepared_by,
            image,
            data } = this.state
            console.log(prepared_by,"prepared_by")

        return (
            <View
                style={styles.wrapperView}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', width: '60%', alignItems: "center", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image
                                style={{ width: 7, height: 13, marginLeft: 20 }}
                                source={require('../../assets/back.png')} />
                        </TouchableOpacity>

                        <Text style={[styles.itemTxt, { fontSize: 24 }]}>Review</Text>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 12, color: '#828282', fontWeight: 'bold', marginTop: 20 }}>Prepared for</Text>
                            <Text style={[styles.itemTxt, { marginTop: 10 }]}>{prepared_for && prepared_for?.owner_name}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_for && prepared_for?.address}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_for && prepared_for?.state}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_for && prepared_for?.city}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_for && prepared_for?.country_code}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_for && prepared_for?.phone} </Text>

                            <Image
                                style={{ width: SCREEN.width - 40, height: SCREEN.height / 3, marginTop: 30, borderRadius: 10 }}
                                source={image ?  {uri: 'http://3.143.107.15/images/'+image}:require('../../assets/pic3.png')} />


                            <Text style={{ fontSize: 12, color: '#828282', fontWeight: 'bold', marginTop: 20 }}>Property location</Text>
                            <Text style={[styles.itemTxt, { marginTop: 10 }]}>{property_location && property_location.address}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{property_location && property_location.address2}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{property_location && (property_location.city + " " + property_location.state + " " + property_location.zip_code)}</Text>


                            <View style={{ width: SCREEN.width - 40, height: 172, borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey', marginTop: 30, alignItems: "center", }}>

                                <Text style={{ fontSize: 12, color: '#828282', fontWeight: 'bold', marginTop: 30 }}>Management contact</Text>
                                <Text style={[styles.itemTxt, { marginTop: 10 }]}>{management_contact && management_contact.name}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{management_contact && management_contact.address}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{management_contact && management_contact.phone}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{management_contact && management_contact.email}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>Site contact</Text>
                            </View>

                            <View style={{ width: SCREEN.width - 40, height: 172, borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey', marginTop: 30, alignItems: "center", }}>

                                <Text style={{ fontSize: 12, color: '#828282', fontWeight: 'bold', marginTop: 30 }}>Prepared by</Text>
                                <Text style={[styles.itemTxt, { marginTop: 10 }]}>{prepared_by && prepared_by.buisness_name}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_by && prepared_by.phone} </Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_by && prepared_by.email}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_by && prepared_by.name}</Text>
                                <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_by && prepared_by.date}</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('PropertiesforInspection')}
                                style={[styles.Btn, { marginTop: 50 }]}>
                                <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>Done</Text>

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
