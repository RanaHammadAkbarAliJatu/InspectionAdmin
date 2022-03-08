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
            cropping: true,
        }).then(image => {

            switch (type) {
                case 0:
                    let image_data1 = {
                        uri: image.path,
                        type: image.mime,
                        name: image.path.substring(image.path.lastIndexOf('/') + 1),
                    };
                    this.setState({ StaircloseFImg: image_data1 });
                    break;
                case 1:
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

        if (this.state.StairsFinding.length === 0) {
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
        else if (this.state.Stairs_id === undefined) {
            alert('Invalid Raling Id');
        }
        else {
            return true
        }

    }

    async AddLocation() {
        // this.setState({loading: true});
        const dataToSend = new FormData();
        const token = this.props.userToken;
        console.log(token)
        // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTI1Mjk3NzM1MDliZjg2NGNjMmMzMTQ4OWE2MjliMTBiNjBhMWMwY2Q3NDdkNzQzOTFmNzQzMWY1OTllNzM0ZDcwMjE5NzBiN2JhOTA0MjUiLCJpYXQiOjE2NDU5MDUxNDQsIm5iZiI6MTY0NTkwNTE0NCwiZXhwIjoxNjc3NDQxMTQ0LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.sJ9d1ROipOCxgilWX6Ymz8oG8pL8ZEicn_6kGEgZsrSvdJLvVagSYaw--DRxru8HulbwVVwgaAlRsV13HDFuYyf55A3D87Ky9qDbtIo9guKbX3PGwzif42DmkaUpufpfe8gTSk3NnJS5m3UYIRumQTyh3kk1LSY6evt4yAGUTv6LO3nD3AceKKh3_75xm8sJRdqeaAXgxAexK3C8m1E08sBiW-tgJLkfwE0a1Mxi3PdIajHrSksAI7paRt98ipcjWT_ZAEAdSxcfUanct7fYDWAQv3uHMq9oGmZejHI1sXM1VI2kZWq_x1-35HCDLm4-LZzOVFnMqBpAEtnNJXIxouvU6UKYzDjzPUSYT7Wn1HdHGuuNYSE-korifnefSt_4FeGnPbiCDERjYrngEgJ2WeTNaXNC7s2DAWxVZ3mMEU4noKc-KZy50BNBPT6RTHNMsovYUfXGrgfyDP2Wy2YMyYYEuac4UCq7wKNlLR5RRZKG0zXpWpd8QcZJe2i3WkGJh0zt9Z9d5JY9KZPiUa4hSXbCJ4seMKm9XsUjL9NzsX7NNTgHumicvOzRwGyb2UMntRjkiVMNjWwO3EjzvxPwhkEkxa7OPZZjA5WY-MNt51zGi_orJzbUsGT4DjCELoQ-Qb--dzMPBRvPe-fC2dbWh3Tr9REwci40xr_sUfjiuXo';
        const Ins_id = 15;
        const data = {
            ...this.state.data,
        }
        console.log(data, "data data", this?.props?.route?.params?.inspectionId)
        const railings = [{
            railing_id: data.railing_id,
            railing_finding: data.railing_fining,
            railing_closeup: data.railClosImg,
            railing_photo: data.raillocImg
        }];
        const flashings = [{
            flashing_id: data.flashing_id,
            flashing_finding: data.flashingFinding,
            flashing_closeup: data.flashCloseImg,
            flashing_photo: data.flashCloseImg
        }];
        const deckSurfaces = [{
            deck_surface_id: data.DeckSurface_id,
            deck_surface_finding: data.DeckSurfaceFinding,
            deck_surface_closeup: data.DeckCloseImg,
            deck_surface_photo: data.DeckLocImg,
            deck_maintainence_id: data.DeckSurfaceMaintainance_id
        }];
        const framings = [{
            framing_id: data.Framing_id,
            framing_maintainence_id: data.FramingMaintainacne_id,
            deck_surface_closeup: data.FramingCloseImg,
            deck_surface_closeup: data.FramingLocImg
        }];
        const stairs = [{
            stairs_id: this.state.Stairs_id,
            maintainence_id: this.state.StairsMaintaince_id,
            stairs_finding: this.state.StairsFinding,
            stairs_closeup: this.state.StaircloseFImg,
            stairs_photo: this.state.StairLocFImg
        }];
        const railing = [{
            railing_maintainence_id: data.railingMaintainance_id
        }];
        const flashing = [{
            flashing_maintainence_id: data.flashingMaintainacne_id
        }];
        dataToSend.append("title", data.title)
        dataToSend.append("inspection_id", this?.props?.route?.params?.inspectionId)
        railings.forEach(tag => dataToSend.append("railings[]", tag))
        // dataToSend.append("railings[]", railings)
        // dataToSend.append("flashings[]", flashings)
        flashings.forEach(tag => dataToSend.append("flashings[]", tag))

        // dataToSend.append("deckSurfaces[]", deckSurfaces)
        deckSurfaces.forEach(tag => dataToSend.append("deckSurfaces[]", tag))

        // dataToSend.append("framings[]", framings)
        framings.forEach(tag => dataToSend.append("framings[]", tag))

        // dataToSend.append("railing[]", railing)
        railing.forEach(tag => dataToSend.append("railing[]", tag))

        // dataToSend.append("flashing[]", flashing)
        flashing.forEach(tag => dataToSend.append("flashing[]", tag))

        dataToSend.append("stairs_maintainence_id", this.state.StairsMaintaince_id)
        dataToSend.append("stairs[]", stairs)
        stairs.forEach(tag => dataToSend.append("stairs[]", tag))

        console.log(dataToSend);
        await CreateLocationInspection(dataToSend, token).then(response => {
            console.log(response)
            if (response.status === 200 && !response.data.error) {

                console.log(response)

            }
            else {
                alert("Some thing Went Wrong")
            }
        });
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
                                    onChangeText={(val) => this.setState({ StairsFinding: val })}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder='Street address'
                                    style={styles.textInput}
                                />
                            </View>
                            <View>

                                <TextInput
                                    onChangeText={(val) => this.setState({ StairsFinding: val })}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder='Apartment number or location of work performed'
                                    style={[styles.textInput, { height: 100 }]}
                                />
                            </View>
                            <Text style={[styles.greytxt, { marginTop: 30 }]}>What did you work on?</Text>

                            <View>

                                <View style={{ flexDirection: 'row', marginTop: 10}}>
                                    <View style={{ flexDirection: 'row', marginTop: 10}}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ StairsMaintaince_id: 1 })}
                                            style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 1 ? '#0D2A37' : null, borderColor: '#0D2A37' }} />
                                        <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#0D2A37' }]}>Railing</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10,  marginLeft: 86 }}>

                                        <TouchableOpacity
                                            onPress={() => this.setState({ StairsMaintaince_id: 1 })}
                                            style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 1 ? '#0D2A37' : null, borderColor: '#0D2A37' }} />
                                        <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#0D2A37' }]}>Flasshing/Caulking</Text>

                                    </View>
                                </View>

                            </View>

                            <View>

                                <View style={{ flexDirection: 'row', marginTop: 10}}>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ StairsMaintaince_id: 1 })}
                                            style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 1 ? '#0D2A37' : null, borderColor: '#0D2A37' }} />
                                        <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#0D2A37' }]}>Deck surface</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 50, justifyContent: 'space-between' }}>

                                        <TouchableOpacity
                                            onPress={() => this.setState({ StairsMaintaince_id: 1 })}
                                            style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 1 ? '#0D2A37' : null, borderColor: '#0D2A37' }} />
                                        <Text style={[styles.itemTxt, { fontSize: 12, fontWeight: '400', color: '#0D2A37' }]}>Frame</Text>

                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ StairsMaintaince_id: 1 })}
                                            style={{ width: 16, height: 16, marginRight: 7, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.StairsMaintaince_id === 1 ? '#0D2A37' : null, borderColor: '#0D2A37' }} />
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
                                    onPress={() => this.AddLocation()}
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

