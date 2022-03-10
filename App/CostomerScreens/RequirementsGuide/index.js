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

class RequirementsGuide extends Component {
    render() {
    const data = this?.props?.route?.params?.dataToSend

        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}
                        bounces={false}>
                        <View style={{ flex: 1, width: SCREEN.width - 40, alignSelf: "center" }}>
                            <View style={{ width: '85%', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.goBack()}>
                                    <Image
                                        style={{ width: 7, height: 13, marginTop: 8 }}
                                        source={require('../../assets/back.png')} />

                                </TouchableOpacity>
                                <Text style={[styles.itemTxt, { fontSize: 24, textAlign: 'center' }]}>SB-721 Requirements guide</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, alignSelf: 'center' }}>
                                <Image style={{ width: 11, height: 14, marginRight: 5 }} source={require('../../assets/location.png')} />
                                <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: '700', color: '#828282' }}>(Location of inspection here)</Text>
                            </View>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#828282', marginTop: 20 }}>Senate Bill -721 Program Requirements Guide</Text>
                            <Text style={[styles.itemTxt, { fontWeight: '400', marginTop: 5 }]}>As apartment owners and managers, it is important to understand the Senate Bill -721 requirements now that you have received your inspection report. The purpose of this guide is to inform you of your responsibilities based on the inspection report’s findings.</Text>

                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#828282', marginTop: 20 }}>Report findings</Text>
                            <Text style={[styles.itemTxt, { fontWeight: '400', marginTop: 5 }]}>The report findings are where the results of each individual inspection area are described in detail. It is important to review this section of your report to identify any of the findings that may require additional action. All the findings are color coded to simplify the search process. Pay specific attention to any of the findings that are coded red (immediate action required) or yellow (repairs required). These are the only two categories that by Senate Bill-721 law, require additional actions to be taken by both the Inspection company and the owner of the apartment facility.</Text>

                            <Text style={[styles.itemTxt, { color: '#EB5757', marginTop: 20 }]}>
                                RED (Immediate action required);
                            </Text>

                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#828282', marginTop: 5 }}>Inspection Company Requirements:</Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400', marginRight: 2 }]}>
                                    1.
                                </Text>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400' }]}>Inspection companies are required to notify the property owner and the local building department within 15 days of the initial inspection. It is important to read the inspection report’s text description associated with the finding as it will have information about any additional actions that may need to be taken.</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400', marginRight: 2 }]}>
                                    2.
                                </Text>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400' }]}>If 180 days lapse (from the original inspection date) and no action is taken by the building owner to correct the initial finding, the inspection company is required by SB-721 law to send a 30-day notice to both the property owner and the local building inspection department. The purpose of the notice is to inform the property owner of any potential liens and daily penalties that may be assessed by the local building department and to inform the building department about an ongoing safety issue.</Text>
                            </View>


                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#828282', marginTop: 20 }}>Inspection Company Requirements:</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400', marginRight: 2 }]}>
                                    1.
                                </Text>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400' }]}>Upon receipt of the 15-day notice from the inspection company, the property owner is required to take immediate action to ensure the safety of the affected tenant. This may include preventing access to the inspected area and providing emergency shoring of the structure. Be sure to read the inspection report’s text description associated with the finding as it will state if preventing access or shoring the structure is required.</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400', marginRight: 2 }]}>
                                    2.
                                </Text>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400' }]}>Immediately contact the local building department and begin the process of obtaining an emergency repairs permit.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400', marginRight: 2 }]}>
                                    3.
                                </Text>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400' }]}>Time is of the essence; an architect or engineer may be required to obtain a permit. This could slow down the permitting process. It is important that the 180-day grace period does not expire before repairs are complete.</Text>
                            </View>
                            <Text style={[styles.itemTxt, { color: '#F2994A', marginTop: 20 }]}>
                                YELLOW (repairs required);
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#828282', marginTop: 5 }}>Inspection Company Requirements:</Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400', marginRight: 2 }]}>
                                    1.
                                </Text>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400' }]}>Inspection companies are required to notify the property owner and the local building department within 15 days of the initial inspection. It is important to read the inspection report’s text description associated with the finding as it will have information about any additional actions that may need to be taken.</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400', marginRight: 2 }]}>
                                    2.
                                </Text>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400' }]}>If 180 days lapse (from the original inspection date) and no action is taken by the building owner to correct the initial finding, the inspection company is required by SB-721 law to send a 30-day notice to both the property owner and the local building inspection department. The purpose of the notice is to inform the property owner of any potential liens and daily penalties that may be assessed by the local building department and to inform the building department about an ongoing safety issue.</Text>
                            </View>


                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#828282', marginTop: 20 }}>Inspection Company Requirements:</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400', marginRight: 2 }]}>
                                    1.
                                </Text>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400' }]}>Upon receipt of the 15-day notice from the inspection company, the property owner is required to take immediate action to ensure the safety of the affected tenant. This may include preventing access to the inspected area and providing emergency shoring of the structure. Be sure to read the inspection report’s text description associated with the finding as it will state if preventing access or shoring the structure is required.</Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400', marginRight: 2 }]}>
                                    2.
                                </Text>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400' }]}>Immediately contact the local building department and begin the process of obtaining an emergency repairs permit.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400', marginRight: 2 }]}>
                                    3.
                                </Text>
                                <Text
                                    style={[styles.itemTxt, { fontWeight: '400' }]}>Time is of the essence; an architect or engineer may be required to obtain a permit. This could slow down the permitting process. It is important that the 180-day grace period does not expire before repairs are complete.</Text>
                            </View>

                        <Text style={[styles.itemTxt,{fontWeight:'400', width: SCREEN.width - 50,marginTop: 20}]}>
                        As your inspection company, Deck and Balcony Inspections will send notifications in advance of any approaching dates that may require action by the building owner. We are committed to keeping your facility safe and SB-721 compliant.
                        </Text>

                        <Text
                        onPress={()=> this.props.navigation.navigate("CContent",{dataToSend: data})}
                        style={{fontSize:12, color:'#282461', textDecorationLine:'underline', fontWeight:"bold", marginTop: 50, marginBottom: 20, alignSelf:'center'}}>Return to table of contents</Text>
                        </View>
                    </ScrollView>
                    <View style={{ position: "absolute", height: 139, backgroundColor: "#c9c8db", width: 139, alignSelf: "center", top: SCREEN.height / 2.3, borderRadius: 70, alignItems: "center", justifyContent: 'center', opacity: 0.3 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Logo here</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(RequirementsGuide);

