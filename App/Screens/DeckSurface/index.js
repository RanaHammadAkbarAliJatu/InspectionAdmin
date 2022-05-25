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
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, PURPLE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import Header from '../../Components/Headder/header';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import CamraModel from '../../Components/CamraModel';

class DeckSurface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            DeckSurfaceFinding: '',
            closeFImg: '',
            sendcloseFImg: '',
            sendLocFImg: '',
            LocFImg: '',
            DeckSurfaceMaintainance_id: 0,
            DeckSurface_id: 0,
            DeckSurface_id_other: "",

            DeckSurfaceType: [
                {
                    value: 2,
                    label: "Redwood planks spaced for drainage",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 3,
                    label: "Pressure treated planks spaced for drainage",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 4,
                    label: "Composite planks spaced for drainage",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 5,
                    label: "Concrete over plywood substrate",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 6,
                    label: "Concrete over steel pan deck",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 7,
                    label: "Polymer over plywood substrate",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 8,
                    label: "Other",
                    "created_at": null,
                    "updated_at": null
                }
            ],
            loading: false,
            modal: false,
            ImageModalVisible: false,
            type: 0,
            deckSurfaceData: []
        };
    }

    componentDidMount() {
        const data = this?.props?.route?.params;
        console.log(data, "one")
        this.setState({ data: data });
        // const type = []
        // data?.data?.deckSurface && data?.data?.deckSurface.forEach(el => {
        //     type.push({ label: el.title, value: el.id })
        // })
        // this.setState({ DeckSurfaceType: type });
    }

    picker(type) {
        this.setState({ ImageModalVisible: true, type: type })
    }
    isFormFilled() {

        if (this.state.DeckSurface_id === 0 || this.state.DeckSurface_id === undefined) {
            alert('Select Deck Surface Type');
        } else if (this.state.DeckSurfaceFinding.length === 0) {
            alert('Invalid  Deck Surface Finding');
        }
        else if (this.state.closeFImg === '') {
            alert('Invlalid Close Image');
        }
        else if (this.state.LocFImg === '') {
            alert('Invlalid Location Image');
        }
        else if (this.state.DeckSurfaceMaintainance_id === 0) {
            alert('Invalid deck covering type');
        }

        else {
            return true
        }

    }

    Pass() {
        if (this.isFormFilled()) {
            const { ralingData, flashingData } = this?.props?.route?.params;
            var arrayData = this.state.deckSurfaceData
            arrayData.push({
                "deck_surface_id": this.state.DeckSurface_id,
                "deck_surface_finding": this.state.DeckSurfaceFinding,
                "deck_maintainence_id": this.state.DeckSurfaceMaintainance_id,
                "deck_surface_closeup": this.state.sendcloseFImg,
                "other_type": this.state.DeckSurface_id_other,
                "deck_surface_photo": this.state.sendLocFImg
            })
            this.setState({
                deckSurfaceData: arrayData
            }, () => {
                this.props.navigation.navigate('Framing', { ...this.state.data, deckSurfaceData: this.state.deckSurfaceData, ralingData, flashingData, DeckSurface_id: 1, DeckSurfaceMaintainance_id: this.state.DeckSurfaceMaintainance_id, DeckSurfaceFinding: this.state.DeckSurfaceFinding, DeckCloseImg: this.state.sendcloseFImg, DeckLocImg: this.state.sendLocFImg, inspectionId: this?.props?.route?.params?.inspectionId })
            })
        }

    }

    getSelectedMaintainance() {
        const { DeckSurfaceMaintainance_id } = this.state
        let railingMaintainance_id = DeckSurfaceMaintainance_id
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

        const { DeckSurfaceMaintainance_id } = this.state
        let railingMaintainance_id = DeckSurfaceMaintainance_id

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
        const { deckSurfaceData } = this.state
        return (
            <View style={styles.wrapperView}>
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
                                        if (deckSurfaceData.length == 0) {
                                            this.props.navigation.goBack()
                                        } else {
                                            this.setState({
                                                DeckSurfaceFinding: this.state.deckSurfaceData[this.state.deckSurfaceData.length - 1].states.DeckSurfaceFinding,
                                                closeFImg: this.state.deckSurfaceData[this.state.deckSurfaceData.length - 1].states.closeFImg,
                                                sendcloseFImg: this.state.deckSurfaceData[this.state.deckSurfaceData.length - 1].states.sendcloseFImg,
                                                sendLocFImg: this.state.deckSurfaceData[this.state.deckSurfaceData.length - 1].states.sendLocFImg,
                                                LocFImg: this.state.deckSurfaceData[this.state.deckSurfaceData.length - 1].states.LocFImg,
                                                DeckSurfaceMaintainance_id: this.state.deckSurfaceData[this.state.deckSurfaceData.length - 1].states.DeckSurfaceMaintainance_id,
                                                DeckSurface_id: this.state.deckSurfaceData[this.state.deckSurfaceData.length - 1].states.DeckSurface_id
                                            }, () => {
                                                let arrayPop = [...deckSurfaceData]
                                                arrayPop.pop()
                                                this.setState({
                                                    deckSurfaceData: arrayPop
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
                            <Text style={[styles.itemTxt, { marginTop: 10, fontSize: 34 }]}>Deck surface</Text>
                            <View style={{ height: 2, width: 42, backgroundColor: PURPLE.dark, marginTop: 13 }} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                <Image style={{ width: 11, height: 14, marginRight: 5 }} source={require('../../assets/location.png')} />
                                <Text style={[styles.greytxt, { color: 'black', fontWeight: '900' }]}>{this?.props?.route?.params?.title}</Text>
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
                                        label: 'Select deck covering',

                                    }}
                                    value={this.state.DeckSurface_id}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ DeckSurface_id: itemValue });
                                    }}
                                    pickerProps={{ numberOfLines: 8 }}
                                    items={this.props.get_all_types}
                                />
                            </View>
                            {this.props.get_all_types[this.props.get_all_types.length - 1].value == this.state.DeckSurface_id && <TextInput
                                placeholderTextColor={'lightgrey'}
                                // multiline={true}
                                value={this.state.DeckSurface_id_other}
                                onChangeText={(val) => this.setState({ DeckSurface_id_other: val })}

                                placeholder='Add Other'
                                style={{
                                    borderWidth: 1,
                                    paddingLeft: 10,
                                    height: 40,
                                    paddingVertical: 5,
                                    borderRadius: 6,
                                    color: 'black',
                                    marginTop: 20
                                }}
                            />}
                            <Text style={[styles.greytxt, { marginTop: 30 }]}>Deck surface findings {deckSurfaceData?.length + 1}</Text>

                            <View>

                                <TextInput
                                    placeholderTextColor={'lightgrey'}
                                    onChangeText={(val) => this.setState({ DeckSurfaceFinding: val })}
                                    multiline={true}
                                    numberOfLines={4}
                                    value={this.state.DeckSurfaceFinding}
                                    placeholder='Enter Deck surface findings'
                                    style={[styles.textInput, {
                                        borderColor: this.getSelectedMaintainanceColor()
                                    }]}
                                />
                                {/* <View style={{ position: 'absolute', bottom: 20, right: 5, flexDirection: 'row' }}>
                                    <Image style={{ width: 14, height: 12.2, marginRight: 5, }} source={require('../../assets/redSign.png')} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: this.getSelectedMaintainanceColor() }]}>{this.getSelectedMaintainance()}</Text>
                                </View> */}
                            </View>

                            <Text style={[styles.greytxt, { marginTop: 30 }]}> Maintenance status </Text>

                            <View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ DeckSurfaceMaintainance_id: 1 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.DeckSurfaceMaintainance_id === 1 ? '#EB5757' : null, borderColor: '#EB5757' }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#EB5757' }]}>Immediate action is required.</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ DeckSurfaceMaintainance_id: 2 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.DeckSurfaceMaintainance_id === 2 ? '#F2994A' : null, borderColor: '#F2994A' }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#F2994A' }]}>Repairs are required as soon as possible.</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ DeckSurfaceMaintainance_id: 3 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, backgroundColor: this.state.DeckSurfaceMaintainance_id === 3 ? '#2F80ED' : null, borderColor: '#2F80ED', borderWidth: 1, }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#2F80ED' }]}>Maintenance is required as soon as possible.</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ DeckSurfaceMaintainance_id: 4 })}
                                        style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.DeckSurfaceMaintainance_id === 4 ? '#219653' : null, borderColor: '#219653' }} />
                                    <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#219653' }]}>No problems were found.</Text>
                                </View>
                            </View>


                            <View style={{ marginTop: 30, }}>
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
                                    <Text style={styles.itemTxt}>Add another Deck Surface finding</Text>
                                    <Image
                                        style={{ width: 11.5, height: 11.5 }}
                                        source={require('../../assets/plus2.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.Pass()}
                                    style={[styles.Btn, { width: '100%', flexDirection: 'row', justifyContent: 'space-between' }]}>
                                    <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>Add and continue (Framing)</Text>
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
                            <Text style={[styles.itemTxt, { marginTop: 20, marginLeft: 20 }]}>Add new Deck Surface finding</Text>
                            <Text style={[styles.greytxt, { marginTop: 10, marginLeft: 20 }]}>Do you want to proceed with another Deck Surface finding?</Text>

                            <View style={{ width: 60, marginTop: 20, marginRight: 20, alignSelf: 'flex-end', flexDirection: "row", justifyContent: "space-between" }}>
                                <Text
                                    onPress={() => this.setState({ modal: false })}
                                    style={styles.itemTxt}>No</Text>
                                <Text
                                    onPress={() => {
                                        if (this.isFormFilled()) {

                                            var arrayData = this.state.deckSurfaceData
                                            arrayData.push({
                                                "deck_surface_id": this.state.DeckSurface_id,
                                                "deck_surface_finding": this.state.DeckSurfaceFinding,
                                                "deck_maintainence_id": this.state.DeckSurfaceMaintainance_id,
                                                "deck_surface_closeup": this.state.sendcloseFImg,
                                                "other_type": this.state.DeckSurface_id_other,
                                                "deck_surface_photo": this.state.sendLocFImg,
                                                states: {
                                                    DeckSurfaceFinding: this.state.DeckSurfaceFinding,
                                                    closeFImg: this.state.closeFImg,
                                                    sendcloseFImg: this.state.sendcloseFImg,
                                                    sendLocFImg: this.state.sendLocFImg,
                                                    LocFImg: this.state.LocFImg,
                                                    DeckSurfaceMaintainance_id: this.state.DeckSurfaceMaintainance_id,
                                                    DeckSurface_id: this.state.DeckSurface_id,
                                                    "other_type": this.state.DeckSurface_id_other,

                                                }
                                            })
                                            this.setState({
                                                DeckSurfaceFinding: '',
                                                closeFImg: '',
                                                sendcloseFImg: '',
                                                sendLocFImg: '',
                                                DeckSurface_id_other: "",
                                                LocFImg: '',
                                                DeckSurfaceMaintainance_id: 0,
                                                DeckSurface_id: 0,
                                                loading: false,
                                                modal: false,
                                                ImageModalVisible: false,
                                                type: 0,
                                                deckSurfaceData: arrayData
                                            }, () => {
                                                this.setState({ modal: false })
                                                console.log(this.state.deckSurfaceData)
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
        get_all_types: state.get_all_Types.types.deckSurface,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        callApi: (user, access_token, role) =>
            dispatch(userActions.setUser({ user, access_token, role })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckSurface);

