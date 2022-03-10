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
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
class Railing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            railfin: '',
            closeFImg: '',
            sendcloseFImg: '',
            sendLocFImg: '',
            LocFImg: '',
            loading: false,
            modal: false,
            railingType: '',
            railingMaintainance_id: 0,
            railing_id: 0
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
                            console.log(res);
                            this.setState({ sendcloseFImg: res });
                        }).catch((err) => {
                            console.log(err.message);
                          });;
                    let image_data1 = {
                        uri: image.path,
                        type: image.mime,
                        name: image.path.substring(image.path.lastIndexOf('/') + 1),
                    };
                    this.setState({ closeFImg: image_data1 });
                    break;
                case 1:
                    RNFS.readFile(image.path, 'base64')
                        .then(res => {
                            console.log(res);
                            this.setState({ sendLocFImg: res });
                        }).catch((err) => {
                            console.log(err.message);
                          });;
                    let image_data = {
                        uri: image.path,
                        type: image.mime,
                        name: image.path.substring(image.path.lastIndexOf('/') + 1),
                    };
                    this.setState({ LocFImg: image_data });
                    break;
            }
        });
        this.setState({ state: false });
    }


    componentDidMount() {
        const data = this?.props?.route?.params;
        console.log(data)
        this.setState({ data: data });
        const type = []
        data.data.railing && data.data.railing.forEach(el => {
            type.push({ label: el.title, value: el.id })
        })
        this.setState({ railingType: type });
    }
    isFormFilled() {

        if (this.state.railfin.length === 0) {
            alert('Invalid Railing Finding');
        }
        else if (this.state.closeFImg === '') {
            alert('Invlalid Close Image');
        }
        else if (this.state.LocFImg === '') {
            alert('Invlalid Location Image');
        }
        else if (this.state.railingMaintainance_id === 0) {
            alert('Invalid Maintainance Id');
        }
        // else if (this.state.railing_id === undefined) {
        //     alert('Invalid Raling Id');
        // }
        else {
            return true
        }

    }

    Pass() {
        if (this.isFormFilled()) {
            this.props.navigation.navigate('Flashing', { ...this.state.data, railing_id: this.state.railing_id, railingMaintainance_id: 1, railing_fining: this.state.railfin, railClosImg: this.state.sendcloseFImg, raillocImg: this.state.sendLocFImg, inspectionId: this?.props?.route?.params?.inspectionId })
        }

    }
getSelectedMaintainance(){
    const {railingMaintainance_id} = this.state
    if(railingMaintainance_id == 1){
        return "Immediate action is required."

    }else if(railingMaintainance_id == 2){
        return "Repairs are required as soon as possible."

    }else if(railingMaintainance_id == 3){
        return "Maintenance is required as soon as possible."

    }else if(railingMaintainance_id == 4){
        return "No problems were found."

    }else{
        return "Immediate action is required."
    }
}
getSelectedMaintainanceColor(){
    const {railingMaintainance_id} = this.state

    if(railingMaintainance_id == 1){
        return "#EB5757"

    }else if(railingMaintainance_id == 2){
        return "#F2994A"

    }else if(railingMaintainance_id == 3){
        return "#2F80ED"

    }else if(railingMaintainance_id == 4){
        return "#219653"

    }else{
        return "'#EB5757'"
    }
}
    render() {
        return (
            <View style={styles.wrapperView}>
                <Header
                    leftPress={() => this.props.navigation.goBack()}
                />
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView
                        bounces={false}
                        style={{ flex: 1 }}>
                        <View style={{ flex: 1, width: SCREEN.width - 40, alignSelf: "center" }}>
                            <Text style={[styles.greytxt, { marginTop: 30 }]}>Inspection for</Text>
                            <Text style={[styles.itemTxt, { marginTop: 10, fontSize: 34 }]}>Railing</Text>
                            <View style={{ height: 2, width: 42, backgroundColor: PURPLE.dark, marginTop: 13 }} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                <Image style={{ width: 11, height: 14, marginRight: 5 }} source={require('../../assets/location.png')} />
                                <Text style={styles.greytxt}>(Location of inspection here)</Text>
                            </View>
                            <View style={{ width: '100%', marginTop: 20 }}>
                                <RNPickerSelect
                                    Icon={() => {
                                        return (
                                            <Icon
                                                name="arrow-drop-down"
                                                size={30}
                                                color={'#282461'}
                                                style={{ paddingRight: isIphoneXorAbove ? 0 : 20 }}
                                            />
                                        );
                                    }}
                                    style={{
                                        inputIOS: {
                                            width: '100%',
                                            height: 40,
                                            paddingBottom: 20,
                                            color: '#282461',
                                            fontWeight: 'bold'
                                        },
                                        inputAndroid: {
                                            width: '100%',
                                            height: 40,
                                            paddingBottom: 20,
                                            color: '#282461',
                                            fontWeight: 'bold'
                                        },
                                        placeholder: {
                                            color: '#282461',
                                            fontWeight: 'bold'

                                        },
                                    }}
                                    placeholder={{
                                        label: 'Vehicle Categories',

                                    }}

                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ railing_id: itemValue });
                                    }}
                                    items={this.state.railingType}
                                />
                            </View>
                            <Text style={[styles.greytxt, { marginTop: 30 }]}>Railing findings</Text>

                            <View>

                                <TextInput
                                    onChangeText={(val) => this.setState({ railfin: val })}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder='Enter railing findings'
                                    style={styles.textInput}
                                />
                                <View style={{ position: 'absolute', bottom: 20, right: 5, flexDirection: 'row' }}>
                                    <Image style={{ width: 14, height: 12.2, marginRight: 5, }} source={require('../../assets/redSign.png')} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: this.getSelectedMaintainanceColor() }]}>{this.getSelectedMaintainance()}</Text>
                                </View>
                            </View>

                            <Text style={[styles.greytxt, { marginTop: 30 }]}> Maintenance status </Text>

                            <View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ railingMaintainance_id: 1 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.railingMaintainance_id === 1 ? '#EB5757' : null, borderColor: '#EB5757' }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#EB5757' }]}>Immediate action is required.</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ railingMaintainance_id: 2 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.railingMaintainance_id === 2 ? '#F2994A' : null, borderColor: '#F2994A' }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#F2994A' }]}>Repairs are required as soon as possible.</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ railingMaintainance_id: 3 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, backgroundColor: this.state.railingMaintainance_id === 3 ? '#2F80ED' : null, borderColor: '#2F80ED', borderWidth: 1, }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#2F80ED' }]}>Maintenance is required as soon as possible.</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ railingMaintainance_id: 4 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.railingMaintainance_id === 4 ? '#219653' : null, borderColor: '#219653' }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#219653' }]}>No problems were found.</Text>
                                </View>

                            </View>
                            <View style={{ marginTop: 30 }}>
                                {this.state.closeFImg === '' ? <TouchableOpacity
                                    onPress={() => this.picker(0)}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', height: 45, paddingHorizontal: 15, marginBottom: 10 }]}>
                                    <Text style={styles.itemTxt}>Take close up photo of finding</Text>
                                    <Image
                                        style={{ width: 12, height: 10.5 }}
                                        source={require('../../assets/camer.png')} />
                                </TouchableOpacity> : (
                                    <Image
                                        style={{ width: SCREEN.width - 40, height: 300, marginBottom: 10, borderRadius: 10, resizeMode: "cover" }}
                                        source={{ uri: this.state.closeFImg.uri }} 

                                         />
                                )}
                                {this.state.LocFImg === '' ? <TouchableOpacity
                                    onPress={() => this.picker(1)}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', paddingHorizontal: 15, height: 45, marginBottom: 10 }]}>
                                    <Text style={styles.itemTxt}>Take a location photo of finding</Text>
                                    <Image
                                        style={{ width: 12, height: 12 }}
                                        source={require('../../assets/seacrh.png')} />
                                </TouchableOpacity> : (
                                    <Image
                                        style={{ width: SCREEN.width - 40, height: 300, marginBottom: 10, borderRadius: 10, resizeMode: "cover" }}
                                        source={{ uri: this.state.LocFImg.uri }} 
                                        />
                                )}
                                {/* <TouchableOpacity
                                    onPress={() => this.setState({ modal: true })}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', paddingHorizontal: 15, height: 45 }]}>
                                    <Text style={styles.itemTxt}>Add another railing finding</Text>
                                    <Image
                                        style={{ width: 11.5, height: 11.5 }}
                                        source={require('../../assets/plus2.png')} />
                                </TouchableOpacity> */}

                                <TouchableOpacity
                                    onPress={() => this.Pass()}
                                    style={[styles.Btn, { width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                                    <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>Save and Continue (Flashing/Caulking)</Text>
                                    <Image
                                        style={{ width: 12, height: 6 }}
                                        source={require('../../assets/forward2.png')} />
                                </TouchableOpacity>

                            </View>



                        </View>
                    </ScrollView>
                </SafeAreaView>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.modal}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: 112, borderRadius: 10, width: SCREEN.width - 40, alignSelf: 'center', backgroundColor: "white" }}>
                            <Text style={[styles.itemTxt, { marginTop: 20, marginLeft: 20 }]}>Add new railing finding</Text>
                            <Text style={[styles.greytxt, { marginTop: 10, marginLeft: 20 }]}>Do you want to proceed with another railing find?</Text>

                            <View style={{ width: 60, marginTop: 20, marginRight: 20, alignSelf: 'flex-end', flexDirection: "row", justifyContent: "space-between" }}>
                                <Text
                                    onPress={() => this.setState({ modal: false })}
                                    style={styles.itemTxt}>No</Text>
                                <Text
                                    onPress={() => this.setState({ modal: false })}
                                    style={styles.itemTxt}>Yes</Text>
                            </View>

                        </View>
                    </View>
                </Modal>
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
        Ins_id: state.user.Ins_id,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        callApi: (user, access_token, role) =>
            dispatch(userActions.setUser({ user, access_token, role })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Railing);

