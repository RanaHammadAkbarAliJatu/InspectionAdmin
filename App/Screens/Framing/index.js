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
import CamraModel from '../../Components/CamraModel';
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
            framingType: [
                {
                    value: 2,
                    label: "Wood (Pressure treated) ledger and joists on post and beam construction",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 3,
                    label: "Wood (Non treated) ledger and joists on post and beam construction",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 4,
                    label: "Wood (Non treated) ledger with joists supported by a beam between opposing walls",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 5,
                    label: "Wood (Pressure treated) ledger with joists supported by a beam between opposing walls",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 6,
                    label: "Wood cantilevered joists with exposed underside",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 7,
                    label: "Wood cantilevered joists with covered underside",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 8,
                    label: "Steel frame attached to wall and suspended by diagonal struts",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 9,
                    label: "Other",
                    "created_at": null,
                    "updated_at": null
                }
            ],
            loading: false,
            modal: false,
            sendcloseFImg: '',
            sendLocFImg: '',
            checkBox: false,
            ImageModalVisible: false,
            type: 0,
            framingData: []
        };
    }
    componentDidMount() {
        const data = this?.props?.route?.params;
        console.log(data)
        this.setState({ data: data });
        // const type = []
        // data?.data?.framing && data.data.framing.forEach(el => {
        //     type.push({ label: el.title, value: el.id })
        // })
        // this.setState({ framingType: type });
    }
    // picker(type) {
    //     ImagePicker.openCamera({
    //         width: 300,
    //         height: 400,
    //     }).then(image => {

    //         switch (type) {
    //             case 0:
    //                 RNFS.readFile(image.path, 'base64')
    //                     .then(res => {
    //                         console.log(res);
    //                         this.setState({ sendcloseFImg: res });
    //                     });
    //                 let image_data1 = {
    //                     uri: image.path,
    //                     type: image.mime,
    //                     name: image.path.substring(image.path.lastIndexOf('/') + 1),
    //                 };
    //                 this.setState({ closeFImg: image_data1 });
    //                 break;
    //             case 1:
    //                 RNFS.readFile(image.path, 'base64')
    //                     .then(res => {
    //                         console.log(res);
    //                         this.setState({ sendLocFImg: res });
    //                     });
    //                 let image_data = {
    //                     uri: image.path,
    //                     type: image.mime,
    //                     name: image.path.substring(image.path.lastIndexOf('/') + 1),
    //                 };
    //                 this.setState({ LocFImg: image_data });
    //                 break;
    //         }
    //     });
    //     this.setState({ state: false });
    // }
    picker(type) {
        this.setState({ ImageModalVisible: true, type: type })
    }
    isFormFilled() {
        if (this.state.Framing_id === 0 || this.state.Framing_id === undefined) {
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

    Pass() {
        this.setState({ loading: true });
            const { ralingData, flashingData, deckSurfaceData } = this?.props?.route?.params;
            if (!this.state.checkBox) {
                const myPromise = new Promise((resolve, reject) => {
                    if (this.isFormFilled()) {
                        const data = this.state.data
                        const token = this.props.userToken;
                        var arrayData = this.state.framingData
                        arrayData.push({
                            "framing_id": this.state.Framing_id,
                            "framing_maintainence_id": this.state.FramingMaintainacne_id,
                            "framing_finding": this.state.FramingFinding ? this.state.FramingFinding : "2",
                            "framing_closeup": this.state.sendcloseFImg,
                            "framing_photo": this.state.sendLocFImg
                        })
                        this.setState({
                            framingData: arrayData
                        }, () => {

                            let sendData = {
                                "title": data.title,
                                "inspection_id": this?.props?.route?.params?.inspectionId ? this?.props?.route?.params?.inspectionId : 0,
                                "railings": ralingData,
                                "flashings": flashingData,
                                "deckSurfaces": deckSurfaceData,
                                "framings": this.state.framingData,
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
                            console.log(sendData, "sendData")
                            CreateLocationInspection(sendData, token).then(response => {
                                console.log(response, "response")
                                this.setState({ loading: false });
                                if (response?.status === 200 && !response.data.error) {

                                    this.props.navigation.navigate('PropertiesforInspection')
                                    console.log(response, "response")
                                    resolve()
                                }
                                else {
                                    alert("Some thing Went Wrong")
                                }
                            }).catch((err) => {
                                reject()
                                console.log(err.message, "err");
                                this.setState({ loading: false });

                            });
                        })
                    }
                });
                myPromise
                .then(() => {
                    this.setState({ loading: false });
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ loading: false });
                });
            } else {
                if (this.isFormFilled()) {
                    var arrayData = this.state.framingData
                    arrayData.push({
                        "framing_id": this.state.Framing_id,
                        "framing_maintainence_id": this.state.FramingMaintainacne_id,
                        "framing_finding": this.state.FramingFinding ? this.state.FramingFinding : "2",
                        "framing_closeup": this.state.sendcloseFImg,
                        "framing_photo": this.state.sendLocFImg
                    })
                    this.setState({
                        framingData: arrayData,
                        loading: false
                    }, () => {
                        this.props.navigation.navigate('Stairs', { ...this.state.data, framingData: this.state.framingData, ralingData, flashingData, deckSurfaceData, Framing_id: this.state.Framing_id, FramingMaintainacne_id: this.state.FramingMaintainacne_id, FramingFinding: this.state.FramingFinding, FramingCloseImg: this.state.sendcloseFImg, FramingLocImg: this.state.sendLocFImg, inspectionId: this?.props?.route?.params?.inspectionId })
                    })
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
            return "black"
        }
    }
    render() {
        const { framingData } = this.state
        return (
            <View style={styles.wrapperView}>
                {this.state.loading && <Loader loading={this.state.loading} />}
                <CamraModel
                    type={this.state.type}
                    modalVisible={this.state.ImageModalVisible}
                    modalClose={() => this.setState({ ImageModalVisible: false })}
                    sendImage={(type, image) => {

                        switch (type) {
                            case 0:
                                RNFS.readFile(image.path, 'base64')
                                    .then(res => {
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
                        this.setState({ state: false, ImageModalVisible: false });
                    }}
                />
                <Header
                    leftPress={() => {
                        Alert.alert(
                            "Alert",
                            "your current screen data will be lost, do you want to proceed",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                {
                                    text: "Yes", onPress: () => {
                                        if (framingData.length == 0) {
                                            this.props.navigation.goBack()
                                        } else {
                                            this.setState({
                                                closeFImg: this.state.framingData[this.state.framingData.length - 1].states.closeFImg,
                                                LocFImg: this.state.framingData[this.state.framingData.length - 1].states.LocFImg,
                                                FramingMaintainacne_id: this.state.framingData[this.state.framingData.length - 1].states.FramingMaintainacne_id,
                                                sendcloseFImg: this.state.framingData[this.state.framingData.length - 1].states.sendcloseFImg,
                                                sendLocFImg: this.state.framingData[this.state.framingData.length - 1].states.sendLocFImg
                                            }, () => {
                                                let arrayPop = [...framingData]
                                                arrayPop.pop()
                                                this.setState({
                                                    framingData: arrayPop
                                                })
                                            })
                                        }
                                    }
                                }
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
                                    value={this.state.Framing_id}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ Framing_id: itemValue });
                                    }}
                                    pickerProps={{ numberOfLines: 8 }}
                                    items={this.state.framingType}
                                />
                            </View>

                            <Text style={[styles.greytxt, { marginTop: 30 }]}>Framing findings {framingData?.length + 1}</Text>

                            <View>

                                <TextInput
                                    placeholderTextColor={'lightgrey'}
                                    onChangeText={(val) => this.setState({ FramingFinding: val })}
                                    multiline={true}
                                    numberOfLines={4}
                                    value={this.state.FramingFinding}
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
                                <TouchableOpacity
                                    onPress={() => this.setState({ modal: true })}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', paddingHorizontal: 15, height: 45 }]}>
                                    <Text style={styles.itemTxt}>Add another Framing finding</Text>
                                    <Image
                                        style={{ width: 11.5, height: 11.5 }}
                                        source={require('../../assets/plus2.png')} />
                                </TouchableOpacity>

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
                        <View style={{ height: 130, borderRadius: 10, width: SCREEN.width - 40, alignSelf: 'center', backgroundColor: "white" }}>
                            <Text style={[styles.itemTxt, { marginTop: 20, marginLeft: 20 }]}>Add new Framing finding</Text>
                            <Text style={[styles.greytxt, { marginTop: 10, marginLeft: 20 }]}>Do you want to proceed with another Framing finding?</Text>

                            <View style={{ width: 60, marginTop: 20, marginRight: 20, alignSelf: 'flex-end', flexDirection: "row", justifyContent: "space-between" }}>
                                <Text
                                    onPress={() => this.setState({ modal: false })}
                                    style={styles.itemTxt}>No</Text>
                                <Text
                                    onPress={() => {
                                        if (this.isFormFilled()) {

                                            var arrayData = this.state.framingData
                                            arrayData.push({
                                                "framing_id": this.state.Framing_id,
                                                "framing_maintainence_id": this.state.FramingMaintainacne_id,
                                                "framing_finding": this.state.FramingFinding ? this.state.FramingFinding : "2",
                                                "framing_closeup": this.state.sendcloseFImg,
                                                "framing_photo": this.state.sendLocFImg,
                                                states: {
                                                    closeFImg: this.state.closeFImg,
                                                    LocFImg: this.state.LocFImg,
                                                    FramingMaintainacne_id: this.state.FramingMaintainacne_id,
                                                    sendcloseFImg: this.state.sendcloseFImg,
                                                    sendLocFImg: this.state.sendLocFImg,
                                                }
                                            })
                                            this.setState({
                                                FramingFinding: '',
                                                closeFImg: '',
                                                LocFImg: '',
                                                FramingMaintainacne_id: 0,
                                                Framing_id: 0,
                                                loading: false,
                                                modal: false,
                                                sendcloseFImg: '',
                                                sendLocFImg: '',
                                                checkBox: false,
                                                ImageModalVisible: false,
                                                type: 0,
                                                framingData: arrayData
                                            }, () => {
                                                this.setState({ modal: false })
                                                console.log(this.state.framingData)
                                            })
                                        }
                                    }}
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
        color: 'black',
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

