import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import {Colors} from '../../../constants/colors';
import Header from '../../helpers/header/Header';
import React, {useEffect, useRef, useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {TextInput} from 'react-native-gesture-handler';

const PaymentFun = () => {
  const [name, setName] = useState('');
  const stripe = useStripe();

  const payMe = async () => {
    try {
      const response = await fetch('http://3.108.203.2:8000/api/payment/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({price: 25}),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Merchant Name',
      });

      if (initSheet.error) return console.log(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet();
      if (presentSheet.error) return console.log(presentSheet.error.message);
      Alert.alert('PAYMENT COMPLETE BITCH!');
    } catch (e) {
      console.error('errors');
    }
  };
  console.log(name);
  return (
    <View style={{flex: 1}}>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        style={{width: 300}}></TextInput>
      <Button title="pay me" onPress={() => payMe()} />
    </View>
  );
};

export default PaymentFun;
