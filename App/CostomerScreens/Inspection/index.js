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

class Inspection extends Component {
    render() {
    const data = this?.props?.route?.params?.dataToSend

        return (
            <View style={styles.wrapperView}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView 
                    bounces={false}
                    style={{flex:1}}>

                    
                    <View style={{ flex: 1, width: SCREEN.width - 40, alignSelf: "center" }}>
                        <View style={{ width: '95%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}>
                                <Image
                                    style={{ width: 7, height: 13, }}
                                    source={require('../../assets/back.png')} />

                            </TouchableOpacity>
                            <Text style={[styles.itemTxt, { fontSize: 24 }]}>Inspection Report Guide</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, alignSelf: 'center' }}>
                            <Image style={{ width: 11, height: 14, marginRight: 5 }} source={require('../../assets/location.png')} />
                            <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: '700', color: '#828282' }}>(Location of inspection here)</Text>
                        </View>

                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 20, color: '#828282' }}>Overview</Text>

                        <Text style={[styles.itemTxt,{fontWeight:'400', marginTop: 20}]}> 
                            For an Inspection Report to be SB-721 compliant, there are 5 specific items that must be inspected at each selected elevated element. They are:
                           {'\n'}<Text style={{color: 'black'}}>{'\u2022'}</Text> Deck Railings – In order to ensure safety and provide protection against falls.
                           {'\n'}<Text style={{color: 'black'}}>{'\u2022'}</Text> Flashings and Caulking – In order to prevent moisture intrusion and reduce the likelihood of dry rot.
                           {'\n'}<Text style={{color: 'black'}}>{'\u2022'}</Text> Deck Surfaces – In order to ensure occupant safety.
                           {'\n'}<Text style={{color: 'black'}}>{'\u2022'}</Text> Framing – In order to ensure structural integrity.
                           {'\n'}<Text style={{color: 'black'}}>{'\u2022'}</Text> Stairs – Only exterior stairs require inspection.
                            It is the duty of the field inspector to evaluate and report on the condition of each of the inspected areas by individually addressing each of the 5 items. To aid the consumer with the identification and prioritization of each of the individual findings, we have developed a color-coded system that rates the urgency of each inspected item:
                        </Text>

                        <View style={{marginVertical: 20, alignSelf:'center',alignItems:'center', height: 140, width: 188, borderRadius: 10, borderWidth:1, borderColor: 'lightgrey'}}>
                            <Text style={[styles.itemTxt,{fontWeight:'400', marginVertical: 8}]}>Color code legend</Text>
                            <View style={{borderBottomWidth:1, borderColor:'lightgrey', width:'100%'}}/>
                            <View>

                           
                            <Text style={{fontSize: 12, color:'red' , marginTop:10}}><Text style={{color: 'red'}}>{'\u2B23'}</Text> Immediate action required</Text>
                            <Text style={{fontSize: 12, color:'#F2994A',marginTop:8 }}><Text style={{color: '#F2994A'}}>{'\u2B23'}</Text> Repairs required ASAP</Text>
                            <Text style={{fontSize: 12, color:'blue' ,marginTop:8}}><Text style={{color: 'blue'}}>{'\u2B23'}</Text> Maintenance required</Text>
                            <Text style={{fontSize: 12, color:'green',marginTop:8 }}><Text style={{color: 'green'}}>{'\u2B23'}</Text> No problems found</Text>
                            </View>
                        </View>
                        <Text style={[styles.itemTxt,{fontWeight:'400', marginTop: 20, textAlign:'left'}]}>
                        Once assigned by the inspector, the “Color code” rating remains constant throughout the report. Whether you are reviewing the “Summary Report” page or taking an indepth look at each of the “Individual Findings, you will always know the urgency of the item being reviewed by its assigned color.
                        </Text>

                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 20, color: '#828282' }}>Summary Report</Text>
                        <Text style={[styles.itemTxt,{fontWeight:'400', marginTop: 5, textAlign:'left'}]}>
                        The Summary Report is located immediately following this guide. It is designed to provide apartment owners and managers with a simple and quick way to identify the condition of each of the inspected areas. Reviewing the Summary Report may be particularly beneficial for larger facilities, as a facility with 10 or more inspected areas can easily generate a report of 100 pages or more. The Summary Report helps streamline the search and prioritization process when reviewing the inspection findings. Each of the inspected areas is represented by a colored icon that represents both the location and urgency of conditions of that inspected area. In addition, if you have selected the “Online” version for reviewing your report, you will notice that each icon on the summary page is an active link that directly connects you to the associated items in the more detailed “Report Findings” section.
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 20, color: '#828282' }}>Summary Report</Text>
                        <Text style={[styles.itemTxt,{fontWeight:'400', marginTop: 5, textAlign:'left'}]}>
                        This is by far the largest section of your inspection report where detailed inspection findings can be reviewed. This section can range from 5 to 100 pages depending on the size of the facility and the quantity of elements inspected. As with the summary page,
                        the colored tab to the right side of each pair of photographs represents the urgency of each finding. Be sure to read the text description next to each colored side bar as it contains detailed information about the inspected area.
                        </Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 20, color: '#828282' }}>SB-721 Program Requirements</Text>
                        <Text style={[styles.itemTxt,{fontWeight:'400', marginTop: 5, textAlign:'left'}]}>
                        Located at the end of the report, this page contains important information about any of the actions that may be required by both the inspection company and the property owner as a result of your SB-721 inspection report. When reviewing your report, pay special attention to any findings that are color coded yellow or red. These are the only two priority level designations that have specific timelines and actions required by Senate Bill-721 law.
                        </Text>

                        <View style={{flex: 1, justifyContent:'flex-end', alignItems:'center'}}>

                        <TouchableOpacity
                onPress={() => this.props.navigation.navigate("CSummary",{dataToSend: data})}
                style={[styles.itemView, { backgroundColor: '#c9c8db', height: 45, paddingHorizontal: 15, marginBottom: 30, marginTop: 50}]}>
                <Text style={styles.itemTxt}>Next page</Text>
                <Image
                  style={{ width: 11, height: 8 }}
                  source={require('../../assets/forward.png')} />
              </TouchableOpacity>


              <Text style={[styles.itemTxt,{marginBottom:10}]}>Previous page</Text>

                        </View>
                    </View>
                    </ScrollView>
                    <View style={{ position: "absolute", height: 139, backgroundColor: "#c9c8db", width: 139, alignSelf: "center", top: SCREEN.height / 2.3, borderRadius: 70, alignItems: "center", justifyContent: 'center', opacity:0.3 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white'}}>Logo here</Text>
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