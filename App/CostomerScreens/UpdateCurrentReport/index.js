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
import { locationUpdate } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, PURPLE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import Header from '../../Components/Headder/header';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { LoginForm } from '../../helper/api';
import RNFS from 'react-native-fs';
class UpdateCurrentReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            StaircloseFImg: '',
            StairLocFImg: '',
            Stairs_id: 0,
            StairsFinding: '',
            StairsMaintaince_id: 0,
            StairType: '',
            street_address: '',
            location_for: '',
            loading: false,
            modal: false,
            checkBox: false,
            sendStaircloseFImg: '',
            sendStairLocFImg: '',
        };
    }

    picker(type) {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {

            switch (type) {
                case 0:
                    RNFS.readFile(image.path, 'base64')
                        .then(res => {
                            this.setState({ sendStaircloseFImg: res });
                        });
                    let image_data1 = {
                        uri: image.path,
                        type: image.mime,
                        name: image.path.substring(image.path.lastIndexOf('/') + 1),
                    };
                    this.setState({ StaircloseFImg: image_data1 });
                    break;
                case 1:
                    RNFS.readFile(image.path, 'base64')
                        .then(res => {
                            this.setState({ sendStairLocFImg: res });
                        });
                    let image_data = {
                        uri: image.path,
                        type: image.mime,
                        name: image.path.substring(image.path.lastIndexOf('/') + 1),
                    };
                    this.setState({ StairLocFImg: image_data });
                    break;
            }
        });
    }
    isFormFilled() {
        const { street_address,
            location_for,
            StairsMaintaince_id,
            sendStaircloseFImg,
            sendStairLocFImg } = this.state
        if (!street_address) {
            alert('please enter Street address');
        }
        else if (!location_for) {
            alert('please enter Apartment number');
        }
        else if (!StairsMaintaince_id) {
            alert('select work on');
        }
        else if (!sendStaircloseFImg) {
            alert('Invlalid Close Image');
        }
        else if (!sendStairLocFImg) {
            alert('Invlalid Location Image');
        }
        else {
            return true
        }

    }

    async updateLocation() {
        const { street_address,
            location_for,
            StairsMaintaince_id,
            sendStaircloseFImg,
            sendStairLocFImg } = this.state
        console.log(location_for,
            StairsMaintaince_id,
            sendStaircloseFImg,
            sendStairLocFImg)
            if (this.isFormFilled()) {
                this.setState({ loading: true });
                const token = this.props.userToken;
                let sendData = {
                    "street_address": street_address,
                    "location_for": location_for,
                    "location": StairsMaintaince_id,
                    "photo_closeup": sendStaircloseFImg,
                    "photo_finding": sendStairLocFImg
                }
                await locationUpdate(sendData, token).then(response => {
                    console.log(response)
                    this.setState({ loading: false });
                    if (response.status === 200 && !response.data.error) {

                        console.log(response)
                        this.props.navigation.goBack()

                    }
                    else {
                        alert("Some thing Went Wrong")
                    }
                });
            }
    }
    render() {
        return (
            <View style={styles.wrapperView}>
                <Header
                    leftPress={() => this.props.navigation.goBack()}
                    title={"Update my current report"}
                />
                <SafeAreaView style={{ flex: 1 }}>


                    <ScrollView
                        bounces={false}
                        style={{ flex: 1 }}>
                        <View style={{ flex: 1, width: SCREEN.width - 40, alignSelf: "center" }}>

                            <Text style={[{ textAlign: 'center', marginTop: 12, color: '#828282' }]}>Update report</Text>

                            <Text style={[styles.greytxt, { marginTop: 30 }]}>Address</Text>

                            <View>

                                <TextInput
                                    onChangeText={(val) => this.setState({ street_address: val })}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder='Street address'
                                    style={styles.textInput}
                                />
                            </View>
                            <View>

                                <TextInput
                                    onChangeText={(val) => this.setState({ location_for: val })}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder='Apartment number or location of work performed'
                                    style={[styles.textInput, { height: 100 }]}
                                />
                            </View>
                            <Text style={[styles.greytxt, { marginTop: 30 }]}>What did you work on?</Text>

                            <View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ StairsMaintaince_id: 1 })}
                                            style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 1 ? '#0D2A37' : null, borderColor: '#0D2A37' }} />
                                        <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#0D2A37' }]}>Railing</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 86 }}>

                                        <TouchableOpacity
                                            onPress={() => this.setState({ StairsMaintaince_id: 2 })}
                                            style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 2 ? '#0D2A37' : null, borderColor: '#0D2A37' }} />
                                        <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#0D2A37' }]}>Flasshing/Caulking</Text>

                                    </View>
                                </View>

                            </View>

                            <View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ StairsMaintaince_id: 3 })}
                                            style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 3 ? '#0D2A37' : null, borderColor: '#0D2A37' }} />
                                        <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#0D2A37' }]}>Deck surface</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 50, justifyContent: 'space-between' }}>

                                        <TouchableOpacity
                                            onPress={() => this.setState({ StairsMaintaince_id: 4 })}
                                            style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 4 ? '#0D2A37' : null, borderColor: '#0D2A37' }} />
                                        <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#0D2A37' }]}>Frame</Text>

                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ StairsMaintaince_id: 5 })}
                                            style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 5 ? '#0D2A37' : null, borderColor: '#0D2A37' }} />
                                        <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#0D2A37' }]}>Stairs</Text>
                                    </View>
                                </View>
                            </View>


                            <Text style={{ color: '#828282', marginVertical: 24, paddingBottom: 20 }}>Upload at least 2 photos, one of the work location and one close-up of the repairs made. For examples, refer to your Inspection Report.</Text>

                            <View style={{ marginTop: 30 }}>
                                {this.state.StaircloseFImg === '' ? <TouchableOpacity
                                    onPress={() => this.picker(0)}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', height: 45, paddingHorizontal: 15, marginBottom: 10 }]}>
                                    <Text style={styles.itemTxt}>Take close up photo of finding</Text>
                                    <Image
                                        style={{ width: 12, height: 10.5 }}
                                        source={require('../../assets/camer.png')} />
                                </TouchableOpacity> : (
                                    <Image
                                        style={{ width: SCREEN.width - 40, height: 300, marginBottom: 10, borderRadius: 10, resizeMode: "cover" }}
                                        source={{ uri: this.state.StaircloseFImg.uri }} />
                                )}
                                {this.state.StairLocFImg === '' ? <TouchableOpacity
                                    onPress={() => this.picker(1)}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', paddingHorizontal: 15, height: 45, marginBottom: 10 }]}>
                                    <Text style={styles.itemTxt}>Take a location photo of finding</Text>
                                    <Image
                                        style={{ width: 12, height: 12 }}
                                        source={require('../../assets/seacrh.png')} />
                                </TouchableOpacity> : (
                                    <Image
                                        style={{ width: SCREEN.width - 40, height: 300, marginBottom: 10, borderRadius: 10, resizeMode: "cover" }}
                                        source={{ uri: this.state.StairLocFImg.uri }} />
                                )}

                                <TouchableOpacity
                                    onPress={() => this.updateLocation()}
                                    style={[styles.Btn, { width: '100%' }]}>
                                    <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>Update</Text>
                                </TouchableOpacity>

                            </View>



                        </View>
                    </ScrollView>
                    {this.state.loading && <Loader loading={this.state.loading} />}
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
        alignSelf: 'center'
    },
    itemTxt: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#282461',
    },
    textInput: {
        width: SCREEN.width - 40,
        height: 40,
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
        marginVertical: 10,
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
        Ins_id: state.user.Ins_id
    };
}
const mapDispatchToProps = dispatch => {
    return {
        callApi: (user, access_token, role) =>
            dispatch(userActions.setUser({ user, access_token, role })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCurrentReport);

