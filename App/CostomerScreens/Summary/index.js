import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Loader from '../../Components/Loader';
import { LoginForm } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, RED, WHITE } from '../../helper/Color';
import { FONT, SCREEN } from '../../helper/Constant';

class Summary extends Component {
    render() {
    const data = this?.props?.route?.params?.dataToSend
        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView
                        bounces={false}
                        style={{ flex: 1 }}>


                        <View style={{ flex: 1, width: SCREEN.width - 40, alignSelf: "center" }}>
                            <View style={{ width: '80%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.goBack()}>
                                    <Image
                                        style={{ width: 7, height: 13, }}
                                        source={require('../../assets/back.png')} />

                                </TouchableOpacity>
                                <Text style={[styles.itemTxt, { fontSize: 24 }]}>Summary Report</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, alignSelf: 'center' }}>
                                <Image style={{ width: 11, height: 14, marginRight: 5 }} source={require('../../assets/location.png')} />
                                <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: '700', color: '#828282' }}>(Location of inspection here)</Text>
                            </View>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 20, color: '#828282' }}>Inspection locations</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>

                                <View style={styles.box}>
                                    <Text style={[styles.itemTxt, { fontWeight: '400' }]}>Unit 42</Text>
                                    <View style={{ width: 30, height: 2, borderRadius: 5, backgroundColor: 'red', marginTop: 20 }} />
                                </View>
                            </View>

                            <View style={{ marginVertical: 20, alignSelf: 'center', alignItems: 'center', height: 140, width: 188, borderRadius: 10, borderWidth: 1, borderColor: 'lightgrey' }}>
                                <Text style={[styles.itemTxt, { fontWeight: '400', marginVertical: 8 }]}>Color code legend</Text>
                                <View style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: '100%' }} />
                                <View>


                                    <Text style={{ fontSize: 12, color: 'red', marginTop: 10 }}><Text style={{ color: 'red' }}>{'\u2B23'}</Text> Immediate action required</Text>
                                    <Text style={{ fontSize: 12, color: '#F2994A', marginTop: 8 }}><Text style={{ color: '#F2994A' }}>{'\u2B23'}</Text> Repairs required ASAP</Text>
                                    <Text style={{ fontSize: 12, color: 'blue', marginTop: 8 }}><Text style={{ color: 'blue' }}>{'\u2B23'}</Text> Maintenance required</Text>
                                    <Text style={{ fontSize: 12, color: 'green', marginTop: 8 }}><Text style={{ color: 'green' }}>{'\u2B23'}</Text> No problems found</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("CRailing",{dataToSend: data})}
                                    style={[styles.itemView, { backgroundColor: '#c9c8db', height: 45, paddingHorizontal: 15, marginBottom: 30, marginTop: 50 }]}>
                                    <Text style={styles.itemTxt}>Next page</Text>
                                    <Image
                                        style={{ width: 11, height: 8 }}
                                        source={require('../../assets/forward.png')} />
                                </TouchableOpacity>


                                <Text style={[styles.itemTxt, { marginBottom: 10 }]}>Previous page</Text>

                            </View>

                        </View>
                    </ScrollView>
                    <View style={{ position: "absolute",overflow: 'hidden', height: 139, backgroundColor: "#c9c8db", width: 139, alignSelf: "center", top: SCREEN.height / 2.3, borderRadius: 70, alignItems: "center", justifyContent: 'center', opacity: 0.3 }}>
                    <Image style={{width: 200, height: 200}} source={require('../../assets/logoscreen.png')}/>
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
    box: {
        alignItems: 'center',
        height: 80,
        width: 76,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        justifyContent: 'center',
        marginRight: 5
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

export default connect(mapStateToProps, mapDispatchToProps)(Summary);