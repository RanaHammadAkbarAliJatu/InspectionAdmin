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
class Stairs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            StaircloseFImg: '',
            StairLocFImg: '',
            sendStaircloseFImg: '',
            sendStairLocFImg: '',
            Stairs_id: 0,
            StairsFinding: '',
            StairsMaintaince_id: 0,
            StairType: '',
            loading: false,
            modal: false,
            checkBox: false,
        };
    }

    componentDidMount() {
        const data = this?.props?.route?.params;
        console.log(data);
        this.setState({ data: data });
        const type = []
        data?.data?.stairs && data.data.stairs.forEach(el => {
            type.push({ label: el.title, value: el.id })
        })
        this.setState({ StairType: type });
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

         if (this.state.Stairs_id === 0) {
            alert('Select Stairs type');
        }else if (this.state.StairsFinding.length === 0) {
            alert('Invalid Railing Finding');
        }
        else if (this.state.closeFImg === '') {
            alert('Invlalid Close Image');
        }
        else if (this.state.LocFImg === '') {
            alert('Invlalid Location Image');
        }
        else if (this.state.StairsMaintaince_id === 0) {
            alert('Invalid Maintainance Id');
        }
       
        else {
            return true
        }

    }

    async AddLocation() {
        this.setState({ loading: true });
        const dataToSend = new FormData();
        const token = this.props.userToken;
        console.log(token)
        // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTI1Mjk3NzM1MDliZjg2NGNjMmMzMTQ4OWE2MjliMTBiNjBhMWMwY2Q3NDdkNzQzOTFmNzQzMWY1OTllNzM0ZDcwMjE5NzBiN2JhOTA0MjUiLCJpYXQiOjE2NDU5MDUxNDQsIm5iZiI6MTY0NTkwNTE0NCwiZXhwIjoxNjc3NDQxMTQ0LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.sJ9d1ROipOCxgilWX6Ymz8oG8pL8ZEicn_6kGEgZsrSvdJLvVagSYaw--DRxru8HulbwVVwgaAlRsV13HDFuYyf55A3D87Ky9qDbtIo9guKbX3PGwzif42DmkaUpufpfe8gTSk3NnJS5m3UYIRumQTyh3kk1LSY6evt4yAGUTv6LO3nD3AceKKh3_75xm8sJRdqeaAXgxAexK3C8m1E08sBiW-tgJLkfwE0a1Mxi3PdIajHrSksAI7paRt98ipcjWT_ZAEAdSxcfUanct7fYDWAQv3uHMq9oGmZejHI1sXM1VI2kZWq_x1-35HCDLm4-LZzOVFnMqBpAEtnNJXIxouvU6UKYzDjzPUSYT7Wn1HdHGuuNYSE-korifnefSt_4FeGnPbiCDERjYrngEgJ2WeTNaXNC7s2DAWxVZ3mMEU4noKc-KZy50BNBPT6RTHNMsovYUfXGrgfyDP2Wy2YMyYYEuac4UCq7wKNlLR5RRZKG0zXpWpd8QcZJe2i3WkGJh0zt9Z9d5JY9KZPiUa4hSXbCJ4seMKm9XsUjL9NzsX7NNTgHumicvOzRwGyb2UMntRjkiVMNjWwO3EjzvxPwhkEkxa7OPZZjA5WY-MNt51zGi_orJzbUsGT4DjCELoQ-Qb--dzMPBRvPe-fC2dbWh3Tr9REwci40xr_sUfjiuXo';
        const Ins_id = 15;
        const data = {
            ...this.state.data,
        }
        // console.log(data, "data data", this?.props?.route?.params?.inspectionId)
        // const railings = [{
        //     railing_id: data.railing_id,
        //     railing_finding: data.railing_fining,
        //     railing_closeup: data.railClosImg,
        //     railing_photo: data.raillocImg
        // }];
        // const flashings = [{
        //     flashing_id: data.flashing_id,
        //     flashing_finding: data.flashingFinding,
        //     flashing_closeup: data.flashCloseImg,
        //     flashing_photo: data.flashCloseImg
        // }];
        // const deckSurfaces = [{
        //     deck_surface_id: data.DeckSurface_id,
        //     deck_surface_finding: data.DeckSurfaceFinding,
        //     deck_surface_closeup: data.DeckCloseImg,
        //     deck_surface_photo: data.DeckLocImg,
        //     deck_maintainence_id:data.DeckSurfaceMaintainance_id
        // }];
        // const framings = [{
        //     framing_id: data.Framing_id,
        //     framing_maintainence_id: data.FramingMaintainacne_id,
        //     deck_surface_closeup: data.FramingCloseImg,
        //     deck_surface_closeup: data.FramingLocImg
        // }];
        // const stairs = [{
        //     stairs_id: this.state.Stairs_id,
        //     maintainence_id:this.state.StairsMaintaince_id,
        //     stairs_finding: this.state.StairsFinding,
        //     stairs_closeup: this.state.StaircloseFImg,
        //     stairs_photo:  this.state.StairLocFImg
        // }];
        // const railing = [{
        //     railing_maintainence_id: data.railingMaintainance_id
        // }];
        // const flashing = [{
        //     flashing_maintainence_id: data.flashingMaintainacne_id
        // }];
        // dataToSend.append("title", data.title)
        // dataToSend.append("inspection_id", this?.props?.route?.params?.inspectionId)
        // railings.forEach(tag =>  dataToSend.append("railings[]", tag))
        // // dataToSend.append("railings[]", railings)
        // // dataToSend.append("flashings[]", flashings)
        // flashings.forEach(tag =>  dataToSend.append("flashings[]", tag))

        // // dataToSend.append("deckSurfaces[]", deckSurfaces)
        // deckSurfaces.forEach(tag =>  dataToSend.append("deckSurfaces[]", tag))

        // // dataToSend.append("framings[]", framings)
        // framings.forEach(tag =>  dataToSend.append("framings[]", tag))

        // // dataToSend.append("railing[]", railing)
        // railing.forEach(tag =>  dataToSend.append("railing[]", tag))

        // // dataToSend.append("flashing[]", flashing)
        // flashing.forEach(tag =>  dataToSend.append("flashing[]", tag))

        // dataToSend.append("stairs_maintainence_id", this.state.StairsMaintaince_id)
        // dataToSend.append("stairs[]", stairs)
        // stairs.forEach(tag =>  dataToSend.append("stairs[]", tag))

        // dataToSend.append("title", data.title)
        // dataToSend.append("inspection_id", this?.props?.route?.params?.inspectionId)
        // dataToSend.append("railing_id", data.railing_id)
        // dataToSend.append("railing_finding", data.railing_fining)
        // dataToSend.append("flashing_id", data.flashing_id)
        // dataToSend.append("flashing_finding", data.flashingFinding)
        // dataToSend.append("deck_surface_id", data.DeckSurface_id)
        // dataToSend.append("deck_surface_finding", data.DeckSurfaceFinding)
        // dataToSend.append("framing_id", data.Framing_id)
        // dataToSend.append("framing_maintainence_id", data.FramingMaintainacne_id)
        // dataToSend.append("deck_maintainence_id", data.DeckSurfaceMaintainance_id)
        // dataToSend.append("railing_maintainence_id", data.railingMaintainance_id)
        // dataToSend.append("flashing_maintainence_id", data.flashingMaintainacne_id)
        // dataToSend.append("stairs_maintainence_id", this.state.StairsMaintaince_id)
        // dataToSend.append("railing_closeup", data.railClosImg)
        // dataToSend.append("railing_photo", data.raillocImg)
        // dataToSend.append("flashing_closeup", data.flashCloseImg)
        // dataToSend.append("flashing_photo", data.flashCloseImg)
        // dataToSend.append("deck_surface_closeup", data.DeckCloseImg)
        // dataToSend.append("deck_surface_photo", data.DeckLocImg)
        // dataToSend.append("deck_surface_closeup", data.FramingCloseImg)
        // dataToSend.append("deck_surface_closeup", data.FramingLocImg)
        // dataToSend.append("stairs_id", this.state.Stairs_id)
        // dataToSend.append("maintainence_id", this.state.StairsMaintaince_id)
        // dataToSend.append("stairs_finding", this.state.StairsFinding)
        // dataToSend.append("stairs_closeup", this.state.StaircloseFImg)
        // dataToSend.append("stairs_photo", this.state.StairLocFImg)
        // console.log(dataToSend, "dataToSend")
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
                    "framing_id": data.Framing_id,
                    "framing_maintainence_id": data.FramingMaintainacne_id,
                    "framing_finding": data.FramingFinding ? data.FramingFinding : "2",
                    "framing_closeup": data.FramingCloseImg,
                    "framing_photo": data.FramingLocImg
                }
            ],
            "stairs_maintainence_id": this.state.StairsMaintaince_id,
            "stairs": [
                {
                    "stairs_id": this.state.Stairs_id,
                    "stairs_maintainence_id": this.state.StairsMaintaince_id,
                    "stairs_finding": this.state.StairsFinding,
                    "stairs_closeup": this.state.sendStaircloseFImg,
                    "stairs_photo": this.state.sendStairLocFImg
                }
            ]
        }
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

    getSelectedMaintainance() {
        const { StairsMaintaince_id } = this.state
        let railingMaintainance_id = StairsMaintaince_id
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

        const { StairsMaintaince_id } = this.state
        let railingMaintainance_id = StairsMaintaince_id

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
                 leftPress={() =>{
                    Alert.alert(
                        "Alert",
                        "Are you sure you want to re enter data",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "Yes", onPress: () =>  this.props.navigation.goBack() }
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
                            <Text style={[styles.itemTxt, { marginTop: 10, fontSize: 34 }]}>Stairs</Text>
                            <View style={{ height: 2, width: 42, backgroundColor: PURPLE.dark, marginTop: 13 }} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                <Image style={{ width: 11, height: 14, marginRight: 5 }} source={require('../../assets/location.png')} />
                                <Text style={[styles.greytxt,{color: 'black', fontWeight: '900'}]}>{this?.props?.route?.params?.title}</Text>
                            </View>

                            <View style={{ width: '100%', marginTop: 20 }}>
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
                                        label: 'Stair Type',

                                    }}

                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ Stairs_id: itemValue });
                                    }}
                                    items={this.state.StairType}
                                />
                            </View>
                            <Text style={[styles.greytxt, { marginTop: 30 }]}>Stairs findings</Text>

                            <View>

                                <TextInput
                                    onChangeText={(val) => this.setState({ StairsFinding: val })}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder='Enter Stairs findings'
                                    style={[styles.textInput,{
                                        borderColor:  this.getSelectedMaintainanceColor()
                                    }]}
                                />
                                {/* <View style={{ position: 'absolute', bottom: 20, right: 5, flexDirection: 'row' }}>
                                    <Image style={{ width: 14, height: 12.2, marginRight: 5, }} source={require('../../assets/redSign.png')} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400',color: this. getSelectedMaintainanceColor() }]}>{this. getSelectedMaintainance()}</Text>
                                </View> */}
                            </View>

                            <Text style={[styles.greytxt, { marginTop: 30 }]}> Maintenance status </Text>

                            <View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ StairsMaintaince_id: 1 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 1 ? '#EB5757' : null, borderColor: '#EB5757' }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#EB5757' }]}>Immediate action is required.</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ StairsMaintaince_id: 2 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 2 ? '#F2994A' : null, borderColor: '#F2994A' }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#F2994A' }]}>Repairs are required as soon as possible.</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ StairsMaintaince_id: 3 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, backgroundColor: this.state.StairsMaintaince_id === 3 ? '#2F80ED' : null, borderColor: '#2F80ED', borderWidth: 1, }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#2F80ED' }]}>Maintenance is required as soon as possible.</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ StairsMaintaince_id: 4 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 4 ? '#219653' : null, borderColor: '#219653' }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#219653' }]}>No problems were found.</Text>
                                </View>
                            </View>




                            <View style={{ marginTop: 30 }}>
                                {  this.state.StaircloseFImg?.uri && <Image
                                        style={{ width: SCREEN.width - 40, height: 300, marginBottom: 10, borderRadius: 10, resizeMode: "cover" }}
                                        source={{ uri: this.state.StaircloseFImg.uri }} />}
                                        { this.state.StairLocFImg?.uri && <Image
                                        style={{ width: SCREEN.width - 40, height: 300, marginBottom: 10, borderRadius: 10, resizeMode: "cover" }}
                                        source={{ uri: this.state.StairLocFImg.uri }} />}
                                 <TouchableOpacity
                                    onPress={() => this.picker(0)}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', height: 45, paddingHorizontal: 15, marginBottom: 10 }]}>
                                    <Text style={styles.itemTxt}>{this.state.StaircloseFImg === '' ?"Take":"Retake"} close up photo of finding</Text>
                                    <Image
                                        style={{ width: 12, height: 10.5 }}
                                        source={require('../../assets/camer.png')} />
                                </TouchableOpacity> 
                                 <TouchableOpacity
                                    onPress={() => this.picker(1)}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', paddingHorizontal: 15, height: 45, marginBottom: 10 }]}>
                                    <Text style={styles.itemTxt}>{this.state.StairLocFImg === '' ? "Take" : "Retake"} a location photo of finding</Text>
                                    <Image
                                        style={{ width: 12, height: 12 }}
                                        source={require('../../assets/seacrh.png')} />
                                </TouchableOpacity>
                                {/* <TouchableOpacity
                                    onPress={() => this.setState({ modal: true })}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', paddingHorizontal: 15, height: 45 }]}>
                                    <Text style={styles.itemTxt}>Add another Stairs finding</Text>
                                    <Image
                                        style={{ width: 11.5, height: 11.5 }}
                                        source={require('../../assets/plus2.png')} />
                                </TouchableOpacity> */}

                                <TouchableOpacity
                                    onPress={() => this.AddLocation()}
                                    style={[styles.Btn, { width: '100%' }]}>
                                    <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>Finish</Text>
                                </TouchableOpacity>

                            </View>



                        </View>
                    </ScrollView>
                    {this.state.loading && <Loader loading={this.state.loading} />}
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
        Ins_id: state.user.Ins_id
    };
}
const mapDispatchToProps = dispatch => {
    return {
        callApi: (user, access_token, role) =>
            dispatch(userActions.setUser({ user, access_token, role })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stairs);

