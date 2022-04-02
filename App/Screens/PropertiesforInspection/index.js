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
    Alert,
    Linking
} from 'react-native';
import Loader from '../../Components/Loader';
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, PURPLE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import { Get_Inspection_List, ListLocationInspection } from '../../helper/api';
import FastImage from 'react-native-fast-image'
import Moment from 'moment';
class PropertiesforInspection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            data: [],
            loading: false,
        };
    }
    async getInspection() {
        const token = this.props.userToken;
        this.setState({ loading: true });
        await Get_Inspection_List(token).then(response => {
            if (response?.status === 200 && !response.data.error) {
                console.log(response.data)
                this.setState({ data: response.data.data.inspection }, () => {
                    console.log(this.state.data)
                });

            }
            else {
                alert("Some Thing Went Wrong")
            }
        });
        this.setState({ loading: false });
    }
    componentDidMount() {

        this.getInspection()
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getInspection()

            //Put your Data loading function here instead of my this.loadData()
        });
    }
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // }
    handleBackButton() {
        // Alert.alert(
        //     "Alert",
        //     "Are you sure you want to Logout",
        //     [
        //       {
        //         text: "Cancel",
        //         onPress: () => console.log("Cancel Pressed"),
        //         style: "cancel"
        //       },
        //       { text: "Yes", onPress: () =>  this.props.navigation.goBack() }
        //     ]
        //   );
        return true;
    }
    // async componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // }
    render() {
        console.log(this.state.data, "this.state.data")
        return (
            <View
                style={styles.wrapperView}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Text style={[styles.itemTxt, { fontSize: 26, textAlign: 'center', fontWeight: "bold", marginTop: 15 }]}>Properties for inspection</Text>


                    <View style={{ flex: 1 }}>
                        {this.state.data.length > 0 ?
                            <View style={{ height: '100%', alignSelf: 'center', position: 'absolute', marginTop: 20 }}>
                                <FlatList
                                    data={this.state.data}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.itemView}
                                            onPress={() => this.props.navigation.navigate("Inspection", { dataToSend: item, inspectionId: item?.prepared_for?.inspection_id })}
                                        >
                                           
                                            <FastImage
                                                style={{ width: '90%', marginTop: 20, height: 121, alignSelf: 'center' }}
                                                source={item?.image?.image_url ? { uri: 'http://3.143.107.15' + item?.image?.image_url } : require('../../assets/pic3.png')}
                                                resizeMode={FastImage.resizeMode.stretch}
                                            />

                                            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", width: '90%', alignSelf: "center", marginTop: 10 }}>
                                                <Text style={[styles.itemTxt, { fontSize: 12, textAlign: 'center', fontWeight: "bold" }]}>{Moment(item.created_at).format('DD MMM YYYY')}{}</Text>
                                                <TouchableOpacity style={{ flexDirection: 'row' }}
                                                    onPress={() => {
                                                        if (item.pdf_link) {
                                                            Linking.openURL(item.pdf_link)
                                                        } else {
                                                            alert("no pdf found")
                                                        }
                                                    }}>
                                                    <Image
                                                        style={{ width: 10, height: 14, marginRight: 7 }}
                                                        source={require('../../assets/pdf.png')} />
                                                    <Text style={[styles.itemTxt, { fontSize: 12, textAlign: 'center', fontWeight: "bold" }]}>Save pdf</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", width: '90%', alignSelf: "center", marginTop: 10 }}>
                                                <Text style={[styles.itemTxt, { fontSize: 12, textAlign: 'center', fontWeight: "bold" }]}>Business Owner Name: {item?.prepared_for?.owner_name}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", width: '90%', alignSelf: "center", marginTop: 10 }}>
                                                <Text style={[styles.itemTxt, { fontSize: 12, textAlign: 'center', fontWeight: "bold" }]}>City: {item?.property_location?.city}</Text>
                                                <Text style={[styles.itemTxt, { fontSize: 12, textAlign: 'center', fontWeight: "bold" }]}>State: {item?.property_location?.state}</Text>
                                            </View>
                                            {/* <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", width: '90%', alignSelf: "center", marginTop: 10 }}>

                                                <Text style={[styles.itemTxt, { fontSize: 12, textAlign: 'center', fontWeight: "bold" }]}>{item?.prepared_for?.city}</Text>

                                            </View> */}
                                        </TouchableOpacity>
                                    )}
                                />
                            </View> :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 37, color: '#282461', fontWeight: 'bold' }}>No property found!</Text>
                                <Text style={{color: 'black'}}>No property has been added. Please use the</Text>
                                <Text style={{color: 'black'}}>Add button to get started.</Text>
                            </View>}
                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: "flex-end" }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("PreparedFor")}
                            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: PURPLE.dark, height: 65, width: 65, borderRadius: 40, marginRight: 12, marginBottom: 12 }}>
                            <Image style={{ width: 20, height: 20 }} source={require('../../assets/plus.png')} />
                        </TouchableOpacity>


                    </View>

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
    itemView: {
        width: SCREEN.width - 40,
        alignSelf: "center",
        backgroundColor: "white",
        // height: isIphoneXorAbove ? SCREEN.height / 4.8 : SCREEN.height / 4,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -2, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 3,

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

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesforInspection);
