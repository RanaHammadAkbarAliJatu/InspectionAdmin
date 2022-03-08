/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View, TouchableOpacity,Text , SafeAreaView, Platform} from 'react-native';
import { FONT, isIphoneXorAbove, SCREEN } from '../../helper/Constant';
import { BLACK, WHITE } from '../../helper/Color';
function HeaderWithLogoandText({ leftPress, leftIcon,title, rightPress, centerText, centerIcon, boldtext, rightIcon, righText, borderBottom, borderLeftRadius, borderRightRadius}) {
  return (
   <View style={{width: SCREEN.width,  height:Platform.OS=="ios" ? (isIphoneXorAbove ?  100 : 80)  : 60  ,backgroundColor: '#282461'}}>
     <SafeAreaView style={{width:'100%', height:'100%'}}>


      <TouchableOpacity
      onPress={leftPress}
      style={{flexDirection:'row', alignItems:'center',marginTop: isIphoneXorAbove ? 20: 20, }}>
      <Image style={{width: 7, height: 13, marginLeft: 20, marginRight: 8}} source={require('../../assets/backwhite.png')}/>
      <Text style={{color:'white',marginLeft: title ? 18: 0, fontSize: title ? 22: 14, fontWeight: '700'}}>{title ? title:'Back'}</Text>
      </TouchableOpacity>
     
     </SafeAreaView>
    
   </View>
  );
}

export default HeaderWithLogoandText;
