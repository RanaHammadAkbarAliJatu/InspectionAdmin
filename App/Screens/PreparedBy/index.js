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
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import Loader from '../../Components/Loader';
import { CreateInspection } from '../../helper/api';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user';
import { BLACK, GREY, ORANGE, PURPLE, RED, WHITE } from '../../helper/Color';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import DatePicker from 'react-native-date-picker'
import Header from '../../Components/Headder/header';
import Validations from '../../helper/Validations';
class PreparedBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      pforBusinessName: 'Deck and Balcony Inspection Inc.',
      pforNumber: '(916) 238-0618',
      pforEmail: 'dan@deckandbalconyinspections.com',
      pforDate: '',
      pforName: '',
      loading: false,
      date: new Date(),
      open: false
    };
  }

  componentDidMount() {

    const data = this?.props?.route?.params.data;

    this.setState({ data: data })
    if (this?.props?.route?.params?.change) {
      const { PreparedForData,
        PropertyLocationData,
        ManagementContactData,
        TakePictureData,
        PreparedByData } = this?.props?.route?.params
      this.setState({
        pforName: PreparedByData.pfor_name,
        pforDate: PreparedByData.pfor_date,
      })
    }
  }

  isFormFilled() {
    let pforBusinessName = Validations.checkrequired(this.state.pforBusinessName);
    let pforNumber = Validations.checkrequired(this.state.pforNumber);
    let pforEmail = Validations.checkrequired(this.state.pforEmail);
    let pforDate = Validations.checkrequired(this.state.pforDate);
    let pforName = Validations.checkrequired(this.state.pforName);

    if (
      pforBusinessName &&
      pforNumber &&
      pforEmail &&
      pforDate &&
      pforName
    ) {
      return true;
    }
    if (!pforBusinessName) {
      alert('Invali Business Name');
    } else if (!pforNumber) {
      alert('Invalid Number');
    } else if (!pforEmail) {
      alert('Invalid Email');
    } else if (!pforDate) {
      alert('Invalid Date');
    } else if (!pforName) {
      alert('Invalid Name');
    }
    return false;
  }
  update() {
    const { PreparedForData,
      PropertyLocationData,
      ManagementContactData,
      TakePictureData,
      PreparedByData } = this?.props?.route?.params
    this.props.navigation.navigate("Review", {
      dataToSend: {
        PreparedForData: PreparedForData,
        PropertyLocationData: PropertyLocationData,
        ManagementContactData: ManagementContactData,
        PreparedByData: {
          pfor_buisness_name: this.state.pforBusinessName,
          pfor_phone: this.state.pforNumber,
          pfor_email: this.state.pforEmail,
          pfor_date: this.state.pforDate,
          pfor_name: this.state.pforName,
        },
        TakePictureData: TakePictureData
      }
    })

  }
  async CreateInspection() {
    // this.setState({ loading: true });
    const dataToSend = {
      owner_name: this.state.data.backEnd.backdata.preparedFor.owner_name,
      address: this.state.data.backEnd.backdata.preparedFor.address,
      email: this.state.data.backEnd.backdata.preparedFor.email,
      state: this.state.data.backEnd.backdata.preparedFor.state,
      city: this.state.data.backEnd.backdata.preparedFor.city,
      phone: this.state.data.backEnd.backdata.preparedFor.phone,
      country_code: this.state.data.backEnd.backdata.preparedFor.country_code,
      property_address: this.state.data.backEnd.backdata.address1t,
      property_address2: this.state.data.backEnd.backdata.address2,
      property_city: this.state.data.backEnd.backdata.propcity,
      property_state: this.state.data.backEnd.backdata.propstate,
      property_zip_code: this.state.data.backEnd.backdata.zip_code,
      management_name: this.state.data.backEnd.manage_name,
      management_address: this.state.data.backEnd.manage_address,
      management_phone: this.state.data.backEnd.manage_phone,
      management_email: this.state.data.backEnd.manage_email,
      image_url: this.state.data.image,
      pfor_buisness_name: this.state.pforBusinessName,
      pfor_phone: this.state.pforNumber,
      pfor_email: this.state.pforEmail,
      pfor_date: this.state.pforDate,
      pfor_name: this.state.pforName,
      PreparedForData: this?.props?.route?.params?.data?.PreparedForData,
      PropertyLocationData: this?.props?.route?.params?.data?.PropertyLocationData,
      ManagementContactData: this?.props?.route?.params?.data?.ManagementContactData,
      TakePictureData: this?.props?.route?.params?.data?.TakePictureData,
      PreparedByData: {
        pfor_buisness_name: this.state.pforBusinessName,
        pfor_phone: this.state.pforNumber,
        pfor_email: this.state.pforEmail,
        pfor_date: this.state.pforDate,
        pfor_name: this.state.pforName,
      }
    }
    console.log(dataToSend, "dataToSend");
    const token = this.props.userToken;

    if (this.isFormFilled()) {
      this.setState({ loading: false });

      this.props.navigation.navigate("Review", { dataToSend: dataToSend })

      // await CreateInspection(token, dataToSend).then(response => {
      //   console.log(response, "response");
      //   if (response?.status === 200 && !response.data.error) {
      //     if (response.data.success) {
      //       this.props.callApi(response.data)
      //       this.props.navigation.navigate("Review", { dataToSend: response.data.data })
      //       this.setState({ loading: false });
      //     }
      //     else {
      //       alert("Inspection Not Created")
      //     }
      //   }
      //   else {
      //     alert("Some thing Went Wrong")
      //   }
      // });
    }

  }
  render() {
    return (
      <View
        style={styles.wrapperView}>
        <Header
            show={this?.props?.route?.params?.change ? false: true}

          leftPress={() => {
            this.props.navigation.goBack()
          }}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingHorizontal: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>

            <Text style={[styles.itemTxt, { marginTop: 30 }]}>Prepared by</Text>
            <Text style={{ fontSize: 12, color: '#828282', fontWeight: 'bold', marginTop: 30 }}>New inspection step 5/5</Text>


            <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
              <View style={{ height: 3, width: '100%', backgroundColor: PURPLE.dark, borderRadius: 5 }} />
            </View>


            <View style={{ flex: 1 }}>
              <ScrollView
                bounces={false}
                style={{ flex: 1 }}>

                <TextInput
                  onChangeText={(val) => this.setState({ pforBusinessName: val })}
                  placeholder='Deck and Balcony Inspection Inc.'
                  value={this.state.pforBusinessName}
                  style={[styles.TextInput, { marginTop: 30 }]}
                  editable={false}
                />
                <TextInput
                  onChangeText={(val) => this.setState({ pforNumber: val })}
                  value={this.state.pforNumber}
                  placeholder='(916) 238-0618'
                  style={styles.TextInput}
                  editable={false}

                />

                <TextInput
                  onChangeText={(val) => this.setState({ pforEmail: val })}
                  value={this.state.pforEmail}
                  placeholder='dan@deckandbalconyinspections.com'
                  style={styles.TextInput}
                  editable={false}

                />


                <TextInput
                  onChangeText={(val) => this.setState({ pforName: val })}
                  value={this.state.pforName}
                  placeholder='Dan Cronk'
                  style={styles.TextInput}
                />

                <DatePicker
                  modal
                  open={this.state.open}
                  date={this.state.date}
                  mode={"date"}
                  // locale='fr'
                  onConfirm={(date) => {
                    var today = new Date(date);
                    var dd = String(today.getDate()).padStart(2, '0');
                    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    var yyyy = today.getFullYear();

                    today = mm + '/' + dd + '/' + yyyy;
                    this.setState({ pforDate: today, date: date, open: false })
                    console.log(today)
                  }}
                  onCancel={() => {
                    this.setState({ open: false })
                  }}
                />
                <TouchableOpacity onPress={() => { this.setState({ open: true }) }}>

                  <TextInput
                    onChangeText={(val) => this.setState({ pforDate: val })}
                    value={this.state.pforDate ? this.state.pforDate : ''}
                    placeholder='28/12/2021'
                    editable={false}
                    style={styles.TextInput}
                  />

                </TouchableOpacity>

              </ScrollView>
            </View>


            <View style={{ flex: 0.15, justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => {
                  const that = this
                  if (this?.props?.route?.params?.change) {
                    if (that?.isFormFilled()) {//chnge

                      that.update()
      }
                  } else {
                    this.CreateInspection()
                  }

                }}
                style={[styles.Btn]}>
                <Text style={[styles.itemTxt, { fontSize: 12, color: 'white' }]}>{this?.props?.route?.params?.change ? "Update" : "Next"}</Text>

              </TouchableOpacity>

            </View>
          </View>

        </SafeAreaView>
        {this.state.loading && <Loader loading={this.state.loading} />}
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
    fontSize: 34,
    fontWeight: 'bold',
    color: '#282461'
  },
  TextInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    borderRadius: 10,
    paddingLeft: 40,
    marginBottom: 10,
    color: 'black',
  },
  Btn: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282461',
    borderRadius: 10,
    marginBottom: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(PreparedBy);
