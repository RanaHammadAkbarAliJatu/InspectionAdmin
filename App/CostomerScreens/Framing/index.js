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
import { FlatList } from 'react-native-gesture-handler';

class Framing extends Component {
    render() {
        const data = this.props.route.params.dataToSend
        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, width: SCREEN.width - 40, alignSelf: "center" }}>
                        <View style={{ width: '85%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}>
                                <Image
                                    style={{ width: 7, height: 13, }}
                                    source={require('../../assets/back.png')} />

                            </TouchableOpacity>
                            <Text style={[styles.itemTxt, { fontSize: 24 }]}>Inspection findings</Text>
                        </View>
                        {/* <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginTop: 20, color: '#828282' }}>Framing</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 20, color: '#828282' }}>Framing type</Text>
                        <Text style={[styles.itemTxt, { fontWeight: '400', marginTop: 5 }]}>Lorem ipsum dolor sit amet</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, alignSelf: 'center' }}>
                            <Image style={{ width: 11, height: 14, marginRight: 5 }} source={require('../../assets/location.png')} />
                            <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: '700', color: '#828282' }}>(Location of inspection here)</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#828282' }}>Deck surface findings</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 14, height: 12.2, marginRight: 5, }} source={require('../../assets/redSign.png')} />
                                <Text style={[styles.itemTxt, { fontWeight: '400', color: '#EB5757' }]}>Immediate action is required.</Text>
                            </View>
                        </View>
                        <Text style={[styles.itemTxt, { fontWeight: '400', marginTop: 5 }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar lectus pellentesque varius ac laoreet. Pharetra purus at integer semper tortor, elementum congue vestibulum. Tellus tortor in dolor, semper curabitur urna. Risus sagittis quis semper tincidunt.</Text> */}

                        
                           <FlatList
                        data={data?.framing ? data?.framing : []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginTop: 20, color: '#828282' }}>Framing</Text>

                                <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 20, color: '#828282' }}>Framing type</Text>
                                <Text style={[styles.itemTxt, { fontWeight: '400', marginTop: 5 }]}>{item?.framing_id}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, alignSelf: 'center' }}>
                                    <Image style={{ width: 11, height: 14, marginRight: 5 }} source={require('../../assets/location.png')} />
                                    <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: '700', color: '#828282' }}>{data?.title}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                    <View>
                                        <Image style={{ width: 162, height: 162, borderRadius: 10 }} source={item?.framing_closeup ? { uri: 'http://3.143.107.15' + item?.framing_closeup } : require('../../assets/Pic.png')} />
                                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, color: '#828282' }}>Close up</Text>
                                    </View>

                                    <View>
                                        <Image style={{ width: 162, height: 162, borderRadius: 10 }} source={item?.framing_photo ? { uri: 'http://3.143.107.15' + item?.framing_photo } : require('../../assets/pic2.png')} />
                                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, color: '#828282' }}>Inspection location</Text>
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#828282' }}>Framing findings</Text>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ width: 14, height: 12.2, marginRight: 7 }} source={require('../../assets/redSign.png')} />
                                        <Text style={[styles.itemTxt, { fontWeight: '400', color: item?.maintenance?.level ? item?.maintenance?.level : '#EB5757' }]}>{item?.maintenance?.maintainence_title}</Text>
                                    </View>
                                </View>
                                <Text style={[styles.itemTxt, { fontWeight: '400', marginTop: 5 }]}>{item.framing_finding}</Text>
                            </View>
                        )}
                    />
               
                        <View style={{justifyContent: 'flex-end', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("CStairs", { dataToSend: data })}

                                style={[styles.itemView, { backgroundColor: '#c9c8db', height: 45, paddingHorizontal: 15, marginBottom: 30, marginTop: 50 }]}>
                                <Text style={styles.itemTxt}>Next page</Text>
                                <Image
                                    style={{ width: 11, height: 8 }}
                                    source={require('../../assets/forward.png')} />
                            </TouchableOpacity>


                            <Text style={[styles.itemTxt, { marginBottom: 10, }]}>Previous page</Text>
                        </View>
                    </View>




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

export default connect(mapStateToProps, mapDispatchToProps)(Framing);

