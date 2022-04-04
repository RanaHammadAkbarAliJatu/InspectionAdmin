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
import FastImage from 'react-native-fast-image'
import { CreateInspection } from '../../helper/api';

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
    async CreateInspection() {
        const { PreparedForData,
            PropertyLocationData,
            ManagementContactData,
            TakePictureData,
            PreparedByData } = this?.props?.route?.params?.dataToSend
        this.setState({ loading: true });
        const dataToSend = {
            owner_name: PreparedForData.owner_name,
            address: PreparedForData.address,
            email: PreparedForData.email,
            state: PreparedForData.state,
            city: PreparedForData.city,
            phone: PreparedForData.phone,
            // country_code: PreparedForData.country_code,
            property_address: PropertyLocationData.address1t,
            property_address2: PropertyLocationData.address2,
            property_city: PropertyLocationData.propcity,
            property_state: PropertyLocationData.propstate,
            property_zip_code: PropertyLocationData.zip_code,

            management_name: ManagementContactData.manage_name,
            management_address: ManagementContactData.manage_address,
            management_phone: ManagementContactData.manage_phone,
            management_email: ManagementContactData.manage_email,

            pfor_buisness_name: 'Deck and Balcony Inspection Inc.',

            image_url: TakePictureData.sendimage,

            pfor_phone: "(916) 238-0618",
            pfor_email: 'dan@deckandbalconyinspections.com',
            pfor_date: PreparedByData.pfor_date,
            pfor_name: PreparedByData.pfor_name
        }
        console.log(dataToSend, "dataToSend");
        const token = this.props.userToken;

        await CreateInspection(token, dataToSend).then(response => {
            console.log(response, "response");
            this.setState({ loading: false });
            if (response?.status === 200 && !response.data.error) {
                if (response.data.success) {
                    // this.props.callApi(response.data,response.data.response.token.accessToken,)
                    this.props.navigation.navigate('PropertiesforInspection') 
                }
                else {
                    alert("Inspection Not Created")
                    this.setState({ loading: false });

                }
            }
            else {
                alert("Some thing Went Wrong")
                this.setState({ loading: false });

            }
        });

    }
    render() {
        const { PreparedForData,
            PropertyLocationData,
            ManagementContactData,
            TakePictureData,
            PreparedByData } = this?.props?.route?.params?.dataToSend
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
                    <ScrollView style={{ flex: 1, padding: 12 }}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 'bold' }}>1. Prepared for</Text>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate("PreparedFor", {
                                        PreparedForData: PreparedForData,
                                        PropertyLocationData: PropertyLocationData,
                                        ManagementContactData: ManagementContactData,
                                        TakePictureData: TakePictureData,
                                        PreparedByData: PreparedByData,
                                        change: true
                                    })
                                }}>
                                    <Text style={{ fontWeight: 'bold', color: '#282461' }}>Edit details</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Business or owner’s name</Text>
                                <Text style={{color: 'black'}}>{PreparedForData?.owner_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Address</Text>
                                <Text style={{color: 'black'}}>{PreparedForData?.address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>City</Text>
                                <Text style={{color: 'black'}}>{PreparedForData?.city}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>State</Text>
                                <Text style={{color: 'black'}}>{PreparedForData?.state}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Contact number</Text>
                                <Text style={{color: 'black'}}>{PreparedForData?.phone}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 'bold' }}>2. Property location</Text>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate("PropertyLocation", {
                                        PreparedForData: PreparedForData,
                                        PropertyLocationData: PropertyLocationData,
                                        ManagementContactData: ManagementContactData,
                                        TakePictureData: TakePictureData,
                                        PreparedByData: PreparedByData,
                                        change: true
                                    })
                                }}>
                                    <Text style={{ fontWeight: 'bold', color: '#282461' }}>Edit details</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Address line 1</Text>
                                <Text style={{color: 'black'}}>{PropertyLocationData?.address1t}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Address line 2</Text>
                                <Text style={{color: 'black'}}>{PropertyLocationData?.address2}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>City</Text>
                                <Text style={{color: 'black'}}>{PropertyLocationData?.propcity}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>State</Text>
                                <Text style={{color: 'black'}}>{PropertyLocationData?.propstate}</Text>
                            </View>
                           
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Zip code</Text>
                                <Text style={{color: 'black'}}>{PropertyLocationData?.zip_code}</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 'bold' }}>3. Management contact</Text>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate("ManagementContact", {
                                        PreparedForData: PreparedForData,
                                        PropertyLocationData: PropertyLocationData,
                                        ManagementContactData: ManagementContactData,
                                        TakePictureData: TakePictureData,
                                        PreparedByData: PreparedByData,
                                        change: true
                                    })
                                }}>
                                    <Text style={{ fontWeight: 'bold', color: '#282461' }}>Edit details</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Name</Text>
                                <Text style={{color: 'black'}}>{ManagementContactData?.manage_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Address</Text>
                                <Text style={{color: 'black'}}>{ManagementContactData?.manage_address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Contact number</Text>
                                <Text style={{color: 'black'}}>{ManagementContactData?.manage_phone}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Email address</Text>
                                <Text style={{color: 'black'}}>{ManagementContactData?.manage_email}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Site contact</Text>
                                <Text style={{color: 'black'}}>{ManagementContactData?.manage_siteContact}</Text>
                            </View>

                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 'bold' }}>4. Take picture</Text>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('TakePicture', {
                                        PreparedForData: PreparedForData,
                                        PropertyLocationData: PropertyLocationData,
                                        ManagementContactData: ManagementContactData,
                                        TakePictureData: TakePictureData,
                                        PreparedByData: PreparedByData,
                                        change: true
                                    })
                                }}>
                                    <Text style={{ fontWeight: 'bold', color: '#282461' }}>Edit details</Text>
                                </TouchableOpacity>
                            </View>
                            <FastImage
                                style={{ width: '100%', height: SCREEN.height / 2, marginTop: 30, borderRadius: 10 }}
                                source={TakePictureData?.image?.uri ? { uri: TakePictureData?.image?.uri } : require('../../assets/pic3.png')}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 'bold' }}>5. Prepared by</Text>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('PreparedBy', {
                                        PreparedForData: PreparedForData,
                                        PropertyLocationData: PropertyLocationData,
                                        ManagementContactData: ManagementContactData,
                                        TakePictureData: TakePictureData,
                                        PreparedByData: PreparedByData,
                                        change: true
                                    })
                                }}>
                                    <Text style={{ fontWeight: 'bold', color: '#282461' }}>Edit details</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Business name</Text>
                                <Text style={{color: 'black'}}>Deck and Balcony Inspection Inc.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Contact number</Text>
                                <Text style={{color: 'black'}}>{PreparedByData?.pfor_phone}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Email address:</Text>
                                <Text style={{fontSize: 12}}>{PreparedByData?.pfor_email}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Name</Text>
                                <Text style={{color: 'black'}}>{PreparedByData?.pfor_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
                                <Text style={{color: 'black'}}>Date</Text>
                                <Text style={{color: 'black'}}>{PreparedByData?.pfor_date}</Text>
                            </View>
                        </View>
                        {/* <View style={{ alignItems: 'center', flex: 1 }}>

                            <Text style={{ fontSize: 12, color: '#828282', fontWeight: 'bold', marginTop: 20 }}>Prepared for</Text>
                            <Text style={[styles.itemTxt, { marginTop: 10 }]}>{prepared_for && prepared_for?.owner_name}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_for && prepared_for?.address}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_for && prepared_for?.state}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_for && prepared_for?.city}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_for && prepared_for?.country_code}</Text>
                            <Text style={[styles.itemTxt, { marginTop: 5 }]}>{prepared_for && prepared_for?.phone} </Text>
                            <FastImage
                                style={{ width: SCREEN.width - 40, height: SCREEN.height / 3, marginTop: 30, borderRadius: 10 }}
                                source={image ? { uri: 'http://3.143.107.15' + image } : require('../../assets/pic3.png')}
                                resizeMode={FastImage.resizeMode.contain}
                            />

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


                        </View> */}
                        <View style={{ alignItems: 'center', flex: 1 }}>

                            <TouchableOpacity
                                onPress={() => this.CreateInspection()}
                                style={[styles.Btn, { marginTop: 50 }]}>
                                <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>Done</Text>

                            </TouchableOpacity>
                        </View>
                        {this.state.loading && <Loader loading={this.state.loading} />}

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
