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
    TextInput
} from 'react-native';
import Loader from '../../Components/Loader';
import { get_all_Types } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, PURPLE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import Header from '../../Components/Headder/header';


class AddLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            InspectionLocationName: '',
        };
    }
    async componentDidMount() {
        const token = this.props.userToken;

        this.setState({ loading: true });
        // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDdhYzRhNDFlMWJmZGM4ZTAxMzUwMmJkZmI0MzY3NWEzYzcyN2Y5OWJjMDEzNGQzMzMyZjRiOWIwYzIwOGZlMjk5YmY2YWY3ZmRkOTNiM2QiLCJpYXQiOjE2NDU5MDQ2MTgsIm5iZiI6MTY0NTkwNDYxOCwiZXhwIjoxNjc3NDQwNjE4LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.shzdWtW_EDF2VqwV9r_nrVsH91jqWNVkTtpLTbns5vAIThTDJ49UG4xT2D-4S_b3HGPow045XyvObf09SAEBmc14dyDLMB08ICa1YKU1OCdfPtK0TlUinQ4HLgoTJs6hCFywWfKhZuWZ6WC15yXkqH9_QejdaMtapFr9-ZOX4LQpEsiGyBRtvYUUokw8EuAo5M2fwr44XVJfVX2A6mt-lg4nuX5tpvoN9yc6cNepPyqoIGjZZMSNnrBCkH-3uZIgUau1wp6db8YDRbb4pUwmxTkD3BYbzUPcbqPCS-hI_SEiwbYivdmCsOotDXQnCCOoQY1CyobCxusRbS7_A3JcVuGHc_B4V3twg4iNRD1XeetN7D7SSZeaerkdKkv7UxWJAhbe6NveGgPkz3IdZx7IZKQqIVbXhGAwERwTkLzSXoYesONzikYm9VMKg3-riVwYf0S6a8fPdu9aqPgxXm1SZRFWb2L-qibWBM919wJLffsj_4o1mj5-Qp7vzC0K7INg6AFsYKapEKCEucFbk8q6a9XO9c62btLgwhsUbmsy8Wq12bAJzpTzeGXan9ArVJ1UwMCorZWcYZxGfm3aeeGDpe3KDMtt1cFIUq-UyjC_n3FDpz10nOf8X5It-1GcsWK6Osb9vAk6HGI-W6DMrVlbA5IXeFhh8IzFtTfZHjZIHOw";

        //   await get_all_Types(token).then(response => {
        //     console.log(response,"get_all_Types")
        //     if (response?.status === 200) {
        //         this.setState({data: response.data})
        //         this.setState({loading: false});
        //     }
        //     else{
        //       alert("Some thing Went Wrong")
        //     }
        //   });



    }
    render() {
        console.log(this?.props?.route?.params?.inspectionId, "this?.props?.route?.params?.inspectionId")
        return (
            <View style={styles.wrapperView}>
                <Header
                    leftPress={() => this.props.navigation.goBack()}
                />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, width: SCREEN.width - 40, alignSelf: "center" }}>
                        <Text style={[styles.itemTxt, { marginTop: 30 }]}>Add location</Text>
                        <View style={{ height: 2, width: 42, backgroundColor: PURPLE.dark, marginTop: 13 }} />
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                            <Image style={{ width: 11, height: 14, marginRight: 5 }} source={require('../../assets/location.png')} />
                            <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: '700', color: '#828282' }}>(Location of inspection here)</Text>
                        </View> */}
                        <TextInput
                            placeholderTextColor={'lightgrey'}
                            onChangeText={(val) => this.setState({ InspectionLocationName: val })}
                            multiline={true}
                            numberOfLines={4}
                            placeholder='Name of inspection location'
                            style={styles.textInput}
                        />
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Railing', { title: this.state.InspectionLocationName, data: this.state.data, inspectionId: this?.props?.route?.params?.inspectionId })}
                                style={[styles.Btn]}>
                                <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>Start inspection for this location</Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                </SafeAreaView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapperView: {
        flex: 1,
    },
    itemTxt: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#282461',
    },
    textInput: {
        width: SCREEN.width - 40,
        height: 100,
        borderWidth: 1,
        color: 'black',
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
        callApi: (Ins_id) =>
            dispatch(userActions.setInsId({ Ins_id })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);

