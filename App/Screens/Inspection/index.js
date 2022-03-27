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
    TextInput,
    Linking
} from 'react-native';
import Loader from '../../Components/Loader';
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, PURPLE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';

class Inspection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            data: [{ id: 1, txt: 'Lorem ipsum' },
            { id: 2, txt: 'Lorem ipsum' },
            { id: 3, txt: 'Lorem ipsum' },
            { id: 4, txt: 'Lorem ipsum' },
            { id: 5, txt: 'Lorem ipsum' },
            { id: 6, txt: 'Lorem ipsum' },],
            loading: false,
        };
    }

    render() {
        const { location,pdf_link } = this.props.route.params.dataToSend
        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, width: SCREEN.width - 40, alignSelf: "center" }}>

                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", width: '70%' }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}>
                                <Image
                                    style={{ width: 7, height: 13 }}
                                    source={require('../../assets/back.png')} />
                            </TouchableOpacity>

                            <Text style={[styles.itemTxt, { fontSize: 24 }]}>Inspection</Text>
                        </View>

                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#828282', marginTop: 20 }}>Inspections</Text>

                        {/* <View style={[styles.itemView,{marginTop: 10}]}>
                <View style={styles.round}>
                <Text style={styles.itemTxt}>1</Text>
                </View>
                <Text style={[styles.itemTxt,{marginRight:20}]}>(Location of inspection)</Text>
    
                <View style={styles.oval}>
                    <Image style={{width: 10, height: 13}} source={require('../../assets/document.png')}/>
                </View>
                <View style={styles.oval}>
                <Image style={{width: 14, height: 10.5}} source={require('../../assets/eye.png')}/>
            </View>
            </View> */}

                        {/* <View style={[styles.itemView,{marginTop: 10}]}>
                <View style={styles.round}>
                <Text style={styles.itemTxt}>2</Text>
                </View>
                <Text style={[styles.itemTxt,{marginRight:20}]}>(Location of inspection)</Text>
    
                <View style={styles.oval}>
                    <Image style={{width: 10, height: 13}} source={require('../../assets/document.png')}/>
                </View>
                <View style={styles.oval}>
                <Image style={{width: 14, height: 10.5}} source={require('../../assets/eye.png')}/>
            </View>
            </View> */}
                        {location.length > 0 ? location.map((item, i) => (
                            <View style={[styles.itemView, { marginTop: 10 }]}>
                                <View style={styles.round}>
                                    <Text style={styles.itemTxt}>{i + 1}</Text>
                                </View>
                                <Text style={[styles.itemTxt, { marginRight: 20 }]}>{item.title}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {/* <View style={[styles.oval, { marginRight: 12 }]}>
                                        <Image style={{ width: 10, height: 13 }} source={require('../../assets/document.png')} />
                                    </View> */}
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate("CRailing", { dataToSend: item })}>
                                        <View style={styles.oval}>
                                            <Image style={{ width: 14, height: 10.5 }} source={require('../../assets/eye.png')} />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )) : <View style={[styles.itemView, { justifyContent: 'center' }]}>
                            <Text style={[styles.itemTxt]}>No Location of inspections found</Text>

                        </View>}


                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("Review", { dataToSend: this?.props?.route?.params?.dataToSend })}
                                style={[styles.itemView, { backgroundColor: '#c9c8db', height: 45, paddingHorizontal: 15, marginBottom: 10 }]}>
                                <Text style={styles.itemTxt}>View complete report</Text>
                                <Image
                                    style={{ width: 21, height: 16.7 }}
                                    source={require('../../assets/eye.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.itemView, { backgroundColor: '#c9c8db', paddingHorizontal: 15, height: 45 }]}
                                onPress={() => {if(pdf_link){
                                    Linking.openURL(pdf_link) 
                                }else{
                                    alert("no pdf found")
                                }
                            }}>
                                <Text style={styles.itemTxt}>Save complete pdf report</Text>
                                <Image
                                    style={{ width: 18, height: 23 }}
                                    source={require('../../assets/document.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('AddLocation', { inspectionId: this?.props?.route?.params?.inspectionId })}
                                style={[styles.Btn]}>
                                <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>Add location for this inspection</Text>

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
    itemView: {
        width: '100%',
        alignItems: "center",
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 10,
    },
    itemTxt: {
        fontSize: 12,
        fontWeight: '700',
        color: '#282461',
    },
    round: {
        width: 39,
        height: 39,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#c9c8db",
        borderRadius: 30,

    },

    oval: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 38,
        height: 30,
        backgroundColor: "#c9c8db",
        borderRadius: 10,

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
        role: state.user.role,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        callApi: (user, access_token, role) =>
            dispatch(userActions.setUser({ user, access_token, role })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inspection);
