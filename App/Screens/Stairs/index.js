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
import CamraModel from '../../Components/CamraModel';
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
            StairType: [
                {
                    value: 2,
                    label: "Wood stringers, treads and risers with metal railings attached to wood posts",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 3,
                    label: "Wood stringers, treads and risers with wood railings attached to wood posts",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 4,
                    label: "Wood stringers, treads, open risers, with metal railings attached to wood posts",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 5,
                    label: "Wood stringers, treads, open risers, with wood railings attached to wood posts",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 6,
                    label: "Wood stringers, treads and risers with metal railings attached to metal posts",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 7,
                    label: "Wood stringers, treads, open risers, with metal railings attached to metal posts ",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 8,
                    label: "Single metal stringer, concrete steps, metal risers with metal railings attached to metal posts",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 9,
                    label: "Single metal stringer, concrete steps, open risers with metal railings attached to metal posts",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 10,
                    label: "All metal, stringers, treads, risers, and railings",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 11,
                    label: "All metal stringers, treads, and railings with open risers",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 12,
                    label: "Metal pull-down emergency fire escape",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    value: 13,
                    label: "Other",
                    "created_at": null,
                    "updated_at": null
                }
            ],
            loading: false,
            modal: false,
            checkBox: false,
            ImageModalVisible: false,
            type: 0,
            stairsData: []
        };
    }

    componentDidMount() {
        const data = this?.props?.route?.params;
        console.log(data);
        this.setState({ data: data });
        // const type = []
        // data?.data?.stairs && data.data.stairs.forEach(el => {
        //     type.push({ label: el.title, value: el.id })
        // })
        // this.setState({ StairType: type });
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
    //                         this.setState({ sendStaircloseFImg: res });
    //                     });
    //                 let image_data1 = {
    //                     uri: image.path,
    //                     type: image.mime,
    //                     name: image.path.substring(image.path.lastIndexOf('/') + 1),
    //                 };
    //                 this.setState({ StaircloseFImg: image_data1 });
    //                 break;
    //             case 1:
    //                 RNFS.readFile(image.path, 'base64')
    //                     .then(res => {
    //                         this.setState({ sendStairLocFImg: res });
    //                     });
    //                 let image_data = {
    //                     uri: image.path,
    //                     type: image.mime,
    //                     name: image.path.substring(image.path.lastIndexOf('/') + 1),
    //                 };
    //                 this.setState({ StairLocFImg: image_data });
    //                 break;
    //         }
    //     });
    // }
    picker(type) {
        this.setState({ ImageModalVisible: true, type: type })
    }
    isFormFilled() {

        if (this.state.Stairs_id === 0 || this.state.Stairs_id === undefined) {
            alert('Select Stairs type');
        } else if (this.state.StairsFinding.length === 0) {
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

    AddLocation() {
        this.setState({ loading: true }, () => {
            const { ralingData, flashingData, deckSurfaceData, framingData } = this?.props?.route?.params;
            const token = this.props.userToken;
            console.log(token)
            const data = {
                ...this.state.data,
            }
            var arrayData = this.state.stairsData
            arrayData.push({
                "stairs_id": this.state.Stairs_id,
                "stairs_maintainence_id": this.state.StairsMaintaince_id,
                "stairs_finding": this.state.StairsFinding,
                "stairs_closeup": this.state.sendStaircloseFImg,
                "stairs_photo": this.state.sendStairLocFImg
            })
            this.setState({
                stairsData: arrayData
            }, () => {
                this.setState({ modal: false })
                console.log(this.state.arrayData)
                let sendData = {
                    "title": data.title,
                    "inspection_id": this?.props?.route?.params?.inspectionId,
                    "railings": ralingData,
                    "flashings": flashingData,
                    "deckSurfaces": deckSurfaceData,
                    "framings": framingData,
                    "stairs_maintainence_id": this.state.StairsMaintaince_id,
                    "stairs": this.state.stairsData
                }
                console.log(sendData, "sendData")

                CreateLocationInspection(sendData, token).then(response => {
                    console.log(response)
                    this.setState({ loading: false });
                    if (response?.status === 200 && !response.data.error) {

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
            })
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
            return "black"
        }
    }
    render() {
        const { stairsData } = this.state
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
                                        this.setState({ sendStaircloseFImg: res });
                                    });
                                let image_data1 = {
                                    uri: image.path,
                                    type: image.mime,
                                    name: image.path.substring(image.path.lastIndexOf('/') + 1),
                                };
                                this.setState({ StaircloseFImg: image_data1, ImageModalVisible: false });
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
                                this.setState({ StairLocFImg: image_data, ImageModalVisible: false });
                                break;
                        }
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
                                        console.log(stairsData.length)
                                        if (stairsData.length == 0) {
                                            this.props.navigation.goBack()
                                        } else {
                                            this.setState({
                                                StaircloseFImg: this.state.stairsData[this.state.stairsData.length - 1].states.StaircloseFImg,
                                                StairLocFImg: this.state.stairsData[this.state.stairsData.length - 1].states.StairLocFImg,
                                                sendStaircloseFImg: this.state.stairsData[this.state.stairsData.length - 1].states.sendStaircloseFImg,
                                                sendStairLocFImg: this.state.stairsData[this.state.stairsData.length - 1].states.sendStairLocFImg,
                                                Stairs_id: this.state.stairsData[this.state.stairsData.length - 1].states.Stairs_id,
                                                StairsFinding: this.state.stairsData[this.state.stairsData.length - 1].states.StairsFinding,
                                                StairsMaintaince_id: this.state.stairsData[this.state.stairsData.length - 1].states.StairsMaintaince_id
                                            }, () => {
                                                let arrayPop = [...stairsData]
                                                arrayPop.pop()
                                                this.setState({
                                                    stairsData: arrayPop
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
                            <Text style={[styles.itemTxt, { marginTop: 10, fontSize: 34 }]}>Stairs</Text>
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
                                        label: 'Stair Type',

                                    }}
                                    pickerProps={{ numberOfLines: 8 }}
                                    value={this.state.Stairs_id}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({ Stairs_id: itemValue });
                                    }}
                                    items={this.state.StairType}
                                />
                            </View>
                            <Text style={[styles.greytxt, { marginTop: 30 }]}>Stairs findings {stairsData?.length + 1}</Text>

                            <View>

                                <TextInput
                                    onChangeText={(val) => this.setState({ StairsFinding: val })}
                                    multiline={true}
                                    numberOfLines={4}
                                    value={this.state.StairsFinding}
                                    placeholder='Enter Stairs findings'
                                    style={[styles.textInput, {
                                        borderColor: this.getSelectedMaintainanceColor()
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
                                {this.state.StaircloseFImg?.uri && <Image
                                    style={{ width: SCREEN.width - 40, height: 300, marginBottom: 10, borderRadius: 10, resizeMode: "cover" }}
                                    source={{ uri: this.state.StaircloseFImg.uri }} />}
                                {this.state.StairLocFImg?.uri && <Image
                                    style={{ width: SCREEN.width - 40, height: 300, marginBottom: 10, borderRadius: 10, resizeMode: "cover" }}
                                    source={{ uri: this.state.StairLocFImg.uri }} />}
                                <TouchableOpacity
                                    onPress={() => this.picker(0)}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', height: 45, paddingHorizontal: 15, marginBottom: 10 }]}>
                                    <Text style={styles.itemTxt}>{this.state.StaircloseFImg === '' ? "Take" : "Retake"} close up photo of finding</Text>
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
                                <TouchableOpacity
                                    onPress={() => this.setState({ modal: true })}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', paddingHorizontal: 15, height: 45 }]}>
                                    <Text style={styles.itemTxt}>Add another Stairs finding</Text>
                                    <Image
                                        style={{ width: 11.5, height: 11.5 }}
                                        source={require('../../assets/plus2.png')} />
                                </TouchableOpacity>

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
                        <View style={{ height: 130, borderRadius: 10, width: SCREEN.width - 40, alignSelf: 'center', backgroundColor: "white" }}>
                            <Text style={[styles.itemTxt, { marginTop: 20, marginLeft: 20 }]}>Add new Stairs finding</Text>
                            <Text style={[styles.greytxt, { marginTop: 10, marginLeft: 20 }]}>Do you want to proceed with another Stairs finding?</Text>

                            <View style={{ width: 60, marginTop: 20, marginRight: 20, alignSelf: 'flex-end', flexDirection: "row", justifyContent: "space-between" }}>
                                <Text
                                    onPress={() => this.setState({ modal: false })}
                                    style={styles.itemTxt}>No</Text>
                                <Text
                                    onPress={() => {
                                        if (this.isFormFilled()) {

                                            var arrayData = this.state.stairsData
                                            arrayData.push({
                                                "stairs_id": this.state.Stairs_id,
                                                "stairs_maintainence_id": this.state.StairsMaintaince_id,
                                                "stairs_finding": this.state.StairsFinding,
                                                "stairs_closeup": this.state.sendStaircloseFImg,
                                                "stairs_photo": this.state.sendStairLocFImg,
                                                states: {
                                                    StaircloseFImg: this.state.StaircloseFImg,
                                                    StairLocFImg: this.state.StairLocFImg,
                                                    sendStaircloseFImg: this.state.sendStaircloseFImg,
                                                    sendStairLocFImg: this.state.sendStairLocFImg,
                                                    Stairs_id: this.state.Stairs_id,
                                                    StairsFinding: this.state.StairsFinding,
                                                    StairsMaintaince_id: this.state.StairsMaintaince_id,
                                                }
                                            })
                                            this.setState({
                                                StaircloseFImg: '',
                                                StairLocFImg: '',
                                                sendStaircloseFImg: '',
                                                sendStairLocFImg: '',
                                                Stairs_id: 0,
                                                StairsFinding: '',
                                                StairsMaintaince_id: 0,
                                                loading: false,
                                                modal: false,
                                                checkBox: false,
                                                ImageModalVisible: false,
                                                type: 0,
                                                stairsData: arrayData
                                            }, () => {
                                                this.setState({ modal: false })
                                                console.log(this.state.stairsData)
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

