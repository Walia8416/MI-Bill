import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Colors} from '../../../constants/colors';
import Header from '../../helpers/header/Header';
import React, {useEffect, useRef, useState} from 'react';
import {RouteStackParamList} from '../../../Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
import {heighttodp, widthtodp} from '../../../constants/Dimenstions';
import {Bold} from '../../../constants/Fonts';

import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentFun from './paymenFun';
import {Screen_Height} from '../../../constants/constants';
const Payment: React.FC<RouteStackParamList<'Payment'>> = ({
  navigation,
  route,
}: RouteStackParamList<'Payment'>) => {
  const {sid} = route.params;
  return (
    <SafeAreaView style={styles.mainCon}>
      <Header
        testID={'menu'}
        navigation={navigation}
        creds={false}
        title={'Payment'}
      />
      <ScrollView contentContainerStyle={styles.mainCon}>
        <StripeProvider publishableKey="pk_test_51LhuWsSDPfYNQPJ9IkCin2xeuE9Bsl2363xuhu2IfbKEMvZ3fAan5Eavgo7UTdhWs4rNUfRGM6Sfsx4nBgtxuexK00dfnlF8uW">
          <PaymentFun navigation={navigation} sid={sid} />
        </StripeProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    elevation: 5,
    borderRadius: 10,
    width: widthtodp(300),
    height: heighttodp(100),
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainCon: {backgroundColor: Colors.white, flex: 1, height: Screen_Height * 2},
  innercon: {
    justifyContent: 'flex-start',
    alignItems: 'center',

    padding: 20,
  },
  high: {
    fontSize: RFValue(19),
    color: Colors.black,
    fontFamily: Bold,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.mi,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
