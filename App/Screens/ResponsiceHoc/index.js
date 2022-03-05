import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text
} from 'react-native';
import { Platform, StatusBar } from "react-native";
// export default function ResponsiceHoc(HocComponent) {
//   return class extends Component {
//     render() {
//       return (
//         <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
//           <ScrollView>
//             <HocComponent></HocComponent>
//           </ScrollView>
//         </SafeAreaView>
//       );
//     }
//   }
// }
export const ResponsiceHocAppStatusbar = Comp => ({ children, ...props }) => (
  <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      {/* <StatusBar translucent barStyle="light-content"  backgroundColor={"#282461"}/> */}
    <ScrollView>
      <Comp {...props}>
        {children}
      </Comp>
    </ScrollView>
  </SafeAreaView>
)
const ResponsiceHoc = Comp => ({ children, ...props }) => (
  <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      {/* <StatusBar translucent barStyle="light-content"  backgroundColor={""}/> */}
    {/* <ScrollView> */}
      <Comp {...props}>
        {children}
      </Comp>
    {/* </ScrollView> */}
  </SafeAreaView>
)
export default ResponsiceHoc