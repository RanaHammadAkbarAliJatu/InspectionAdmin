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
    Modal,
    Alert

} from 'react-native';
import Loader from '../../Components/Loader';
import { CreateLocationInspection } from '../../helper/api';
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
class Framing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            FramingFinding: '',
            closeFImg: '',
            LocFImg: '',
            FramingMaintainacne_id: 0,
            Framing_id: 0,
            framingType: '',
            loading: false,
            modal: false,
            sendcloseFImg: '',
            sendLocFImg: '',
            checkBox: false,
        };
    }
    componentDidMount() {
        const data = this?.props?.route?.params;
        console.log(data)
        this.setState({ data: data });
        const type = []
        data?.data?.framing && data.data.framing.forEach(el => {
            type.push({ label: el.title, value: el.id })
        })
        this.setState({ framingType: type });
    }
    picker(type) {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
        }).then(image => {

            switch (type) {
                case 0:
                    RNFS.readFile(image.path, 'base64')
                        .then(res => {
                            console.log(res);
                            this.setState({ sendcloseFImg: res });
                        });
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
                        });
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
    isFormFilled() {

        if (this.state.Framing_id === 0) {
            alert('Select Framing type');
        } else if (this.state.FramingFinding.length === 0) {
            alert('Invalid Framing Finding');
        }
        else if (this.state.closeFImg === '') {
            alert('Invlalid Close Image');
        }
        else if (this.state.LocFImg === '') {
            alert('Invlalid Location Image');
        }
        else if (this.state.FramingMaintainacne_id === 0) {
            alert('Invalid Maintainance Id');
        }

        else {
            return true
        }

    }

    async Pass() {
        if (!this.state.checkBox) {
            if (this.isFormFilled()) {
                const data = this.state.data
                const token = this.props.userToken;

                let sendData = {
                    "title": data.title,
                    "inspection_id": this?.props?.route?.params?.inspectionId,
                    "railings": [
                        {
                            "railing_id": data.railing_id,
                            "railing_finding": data.railing_fining,
                            "railing_maintainence_id": data.railingMaintainance_id,
                            "railing_closeup": data.railClosImg,
                            "railing_photo": data.raillocImg
                        }
                    ],
                    "flashings": [
                        {
                            "flashing_id": data.flashing_id,
                            "flashing_finding": data.flashingFinding,
                            "flashing_maintainence_id": data.flashingMaintainacne_id,
                            "flashing_closeup": data.flashCloseImg,
                            "flashing_photo": data.flashCloseImg
                        }
                    ],
                    "deckSurfaces": [
                        {
                            "deck_surface_id": data.DeckSurface_id,
                            "deck_surface_finding": data.DeckSurfaceFinding,
                            "deck_maintainence_id": data.DeckSurfaceMaintainance_id,
                            "deck_surface_closeup": data.DeckCloseImg,
                            "deck_surface_photo": data.DeckLocImg
                        }
                    ],
                    "framings": [
                        {
                            "framing_id": this.state.Framing_id,
                            "framing_maintainence_id": this.state.FramingMaintainacne_id,
                            "framing_finding": this.state.FramingFinding ? this.state.FramingFinding : "2",
                            "framing_closeup": this.state.sendcloseFImg,
                            "framing_photo": this.state.sendLocFImg
                        }
                    ],
                    "stairs_maintainence_id": 0,
                    "stairs": [
                        {
                            "stairs_id": 0,
                            "stairs_maintainence_id": 0,
                            "stairs_finding": 0,
                            "stairs_closeup": this.state.sendLocFImg,
                            "stairs_photo": this.state.sendLocFImg
                        }
                    ]
                }
                console.log(sendData)
                console.log(this?.props?.route?.params)
                await CreateLocationInspection(sendData, token).then(response => {
                    console.log(response)
                    this.setState({ loading: false });
                    if (response.status === 200 && !response.data.error) {

                        this.props.navigation.navigate('PropertiesforInspection')
                        console.log(response, "response")

                    }
                    else {
                        alert("Some thing Went Wrong")
                    }
                }).catch((err) => {
                    console.log(err.message);
                    this.setState({ loading: false });

                });
            }
        } else {
            if (this.isFormFilled()) {
                this.props.navigation.navigate('Stairs', { ...this.state.data, Framing_id: this.state.Framing_id, FramingMaintainacne_id: this.state.FramingMaintainacne_id, FramingFinding: this.state.FramingFinding, FramingCloseImg: this.state.sendcloseFImg, FramingLocImg: this.state.sendLocFImg, inspectionId: this?.props?.route?.params?.inspectionId })
            }

        }


    }

    getSelectedMaintainance() {
        const { FramingMaintainacne_id } = this.state
        let railingMaintainance_id = FramingMaintainacne_id
        if (railingMaintainance_id == 1) {
            return "Immediate action is required."

        } else if (railingMaintainance_id == 2) {
            return "Repairs are required as soon as possible."

        } else if (railingMaintainance_id == 3) {
            return "Maintenance is required as soon as possible."

        } else if (railingMaintainance_id == 4) {
            return "No problems were found."

        } else {
            return "Immediate action is required."
        }
    }
    getSelectedMaintainanceColor() {

        const { FramingMaintainacne_id } = this.state
        let railingMaintainance_id = FramingMaintainacne_id

        if (railingMaintainance_id == 1) {
            return "#EB5757"

        } else if (railingMaintainance_id == 2) {
            return "#F2994A"

        } else if (railingMaintainance_id == 3) {
            return "#2F80ED"

        } else if (railingMaintainance_id == 4) {
            return "#219653"

        } else {
            return "'#EB5757'"
        }
    }
    render() {
        return (
            <View style={styles.wrapperView}>
                <Header
                    leftPress={() => {
                        Alert.alert(
                            "Alert",
                            "Are you sure you want to re enter data",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                { text: "Yes", onPress: () => this.props.navigation.goBack() }
                            ]
                        );
                    }}
                />
                <SafeAreaView style={{ flex: 1 }}>


                    <ScrollView
                        bounces={false}
                        style={{ flex: 1 }}>
                        <View style={{ flex: 1, width: SCREEN.width - 40, alignSelf: "center" }}>

                            <Text style={[styles.greytxt, { marginTop: 30 }]}>Inspection for</Text>
                            <Text style={[styles.itemTxt, { marginTop: 10, fontSize: 34 }]}>Framing</Text>
                            <View style={{ height: 2, width: 42, backgroundColor: PURPLE.dark, marginTop: 13 }} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                <Image style={{ width: 11, height: 14, marginRight: 5 }} source={require('../../assets/location.png')} />
                                <Text style={[styles.greytxt, { color: 'black', fontWeight: '900' }]}>{this?.props?.route?.params?.title}</Text>
                            </View>

                            <View style={{ width: '100%', marginTop: 20, }}>
                                <RNPickerSelect
                                    // Icon={() => {
                                    //     return (
                                    //         <Icon
                                    //             name="arrow-drop-down"
                                    //             size={30}
                                    //             color={'#282461'}
                                    //             style={{ paddingRight: isIphoneXorAbove ? 0 : 20 }}
                                    //         />
                                    //     );
                                    // }}
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
                                        label: 'Framing Type',

                                    }}

                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ Framing_id: itemValue });
                                    }}
                                    items={this.state.framingType}
                                />
                            </View>
                            <Text style={[styles.greytxt, { marginTop: 30 }]}>Framing findings</Text>

                            <View>

                                <TextInput
                                    onChangeText={(val) => this.setState({ FramingFinding: val })}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder='Enter Framing findings'
                                    style={[styles.textInput, {
                                        borderColor: this.getSelectedMaintainanceColor()
                                    }]}
                                />
                                {/* <View style={{ position: 'absolute', bottom: 20, right: 5, flexDirection: 'row' }}>
                                <Image style={{ width: 14, height: 12.2, marginRight: 5, }} source={require('../../assets/redSign.png')} />
                                <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400',  color: this. getSelectedMaintainanceColor() }]}>{this. getSelectedMaintainance()}</Text>
                            </View> */}
                            </View>

                            <Text style={[styles.greytxt, { marginTop: 30 }]}> Maintenance status </Text>

                            <View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ FramingMaintainacne_id: 1 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.FramingMaintainacne_id === 1 ? '#EB5757' : null, borderColor: '#EB5757' }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#EB5757' }]}>Immediate action is required.</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ FramingMaintainacne_id: 2 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.FramingMaintainacne_id === 2 ? '#F2994A' : null, borderColor: '#F2994A' }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#F2994A' }]}>Repairs are required as soon as possible.</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ FramingMaintainacne_id: 3 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, backgroundColor: this.state.FramingMaintainacne_id === 3 ? '#2F80ED' : null, borderColor: '#2F80ED', borderWidth: 1, }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#2F80ED' }]}>Maintenance is required as soon as possible.</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ FramingMaintainacne_id: 4 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.FramingMaintainacne_id === 4 ? '#219653' : null, borderColor: '#219653' }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#219653' }]}>No problems were found.</Text>
                                </View>
                            </View>

                            <Text style={[styles.greytxt, { marginTop: 20 }]}>Stairs inspection</Text>


                            <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>


                                <TouchableOpacity
                                    onPress={() => this.setState({ checkBox: !this.state.checkBox })}
                                    style={{ borderWidth: this.state.checkBox ? 0 : 1, borderColor: this.state.checkBox ? PURPLE.dark : 'lightgrey', width: 17, height: 17, borderRadius: 5, backgroundColor: this.state.checkBox ? PURPLE.dark : WHITE.whitegrey, alignItems: "center", justifyContent: 'center' }}>
                                    {this.state.checkBox &&
                                        <Image
                                            style={{ width: 7.88, height: 5.66 }}
                                            source={require('../../assets/smalltick.png')} />}
                                </TouchableOpacity>

                                <Text style={[styles.itemTxt, { fontWeight: "500", marginLeft: 10 }]}>Does this location have stairs?</Text>
                            </View>

                            <View style={{ marginTop: 30 }}>
                                {this.state.closeFImg?.uri && <Image
                                    style={{ width: SCREEN.width - 40, height: 300, marginBottom: 10, borderRadius: 10, resizeMode: "cover" }}
                                    source={{ uri: this.state.closeFImg.uri }} />}
                                {this.state.LocFImg?.uri && <Image
                                    style={{ width: SCREEN.width - 40, height: 300, marginBottom: 10, borderRadius: 10, resizeMode: "cover" }}
                                    source={{ uri: this.state.LocFImg.uri }} />}
                                <TouchableOpacity
                                    onPress={() => this.picker(0)}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', height: 45, paddingHorizontal: 15, marginBottom: 10 }]}>
                                    <Text style={styles.itemTxt}>{this.state.closeFImg === '' ? "Take" : "Retake"} close up photo of finding</Text>
                                    <Image
                                        style={{ width: 12, height: 10.5 }}
                                        source={require('../../assets/camer.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.picker(1)}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', paddingHorizontal: 15, height: 45, marginBottom: 10 }]}>
                                    <Text style={styles.itemTxt}>{this.state.LocFImg === '' ? "Take" : "Retake"} a location photo of finding</Text>
                                    <Image
                                        style={{ width: 12, height: 12 }}
                                        source={require('../../assets/seacrh.png')} />
                                </TouchableOpacity>
                                {/* <TouchableOpacity 
                            onPress={()=> this.setState({modal: true})}
                            style={[styles.itemView, { backgroundColor: '#c9c8db', paddingHorizontal: 15, height: 45 }]}>
                                <Text style={styles.itemTxt}>Add another Framing finding</Text>
                                <Image
                                    style={{ width: 11.5, height: 11.5 }}
                                    source={require('../../assets/plus2.png')} />
                            </TouchableOpacity> */}

                                <TouchableOpacity
                                    onPress={() => this.Pass()}
                                    style={[styles.Btn, { width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                                    <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>{this.state.checkBox ? "Add and continue (Stairs)" : "Finish"}</Text>
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
        role: state.user.role,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        callApi: (user, access_token, role) =>
            dispatch(userActions.setUser({ user, access_token, role })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Framing);

