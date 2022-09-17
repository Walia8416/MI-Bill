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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../../constants/colors';
import Header from '../../helpers/header/Header';
import React, {useEffect, useRef, useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {TextInput} from 'react-native-gesture-handler';
import InputFeild from '../../helpers/inputfields/InputField';
import {RFValue} from 'react-native-responsive-fontsize';
import {Bold} from '../../../constants/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi, Sae} from 'react-native-textinput-effects';
import {cropData} from '../products/cropData';
import CartCard from './cartCard';
import {heighttodp, widthtodp} from '../../../constants/Dimenstions';
import { Screen_Width } from '../../../constants/constants';
import BackButton from '../../helpers/buttons/BackButton';




const PaymentFun = ({navigation}) => {
  useEffect(() => {
    getCart();
    console.log(gg);
  }, []);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const stripe = useStripe();
  const [cname, setCname] = useState('');
  const [phone, setPhone] = useState('');
  const [caddr, setCaddr] = useState('');
  const [email, setEmail] = useState('');
  const [gg, setGG] = useState([]);

  const removeCart = (bb) => {
    setGG(current =>
      current.filter(item => {
        
        return item._id !== bb._id;
      }),
    );
  };


  const getCart = async () => {
    try {
      const resp = await AsyncStorage.getItem('Cart');
      setGG(JSON.parse(resp))
      console.log(gg)
    } catch (e) {
      console.log('fail save');
    }
  };
  const payMe = async (tots) => {
    try {
      const response = await fetch('http://3.108.203.2:8000/api/payment/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({price: tots}),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'MI',
      });

      if (initSheet.error) return console.log(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet();
      if (presentSheet.error) return console.log(presentSheet.error.message);
      Alert.alert('Payment Has Been Completed');
      navigation.navigate("Home");
    } catch (e) {
      console.error('errors');
    }
  };
  const total = gg.reduce((a,v) =>  a = a + parseInt(v.price) , 0 );
  console.log(name);
  return (
    <View style={styles.mainCon}>
      <Text style={styles.high}>Customer Details</Text>
      <View style={styles.innerCon}>
        <Fumi
          passiveIconColor={'white'}
          style={styles.inp}
          label={'Customer Name'}
          iconClass={FontAwesomeIcon}
          iconName={'university'}
          iconColor={'white'}
          iconSize={20}
          inputPadding={16}
          inputStyle={{color:"black"}}
          onChangeText={(text) => setCname(text)}  

        />
        <Fumi
          passiveIconColor={'white'}
          style={styles.inp}
          label={'Phone Number'}
          iconClass={FontAwesomeIcon}
          iconName={'university'}
          iconColor={'white'}
          iconSize={20}
          inputPadding={16}
          inputStyle={{color:"black"}}
          onChangeText={(text) => setPhone(text)}  
        />
        <Fumi
          passiveIconColor={'white'}
          style={styles.inp}
          label={'Address'}
          iconClass={FontAwesomeIcon}
          iconName={'university'}
          iconColor={'white'}
          iconSize={20}
          inputStyle={{color:"black"}}
          inputPadding={16}
          onChangeText={(text) => setCaddr(text)}  
        />
        <Fumi
          passiveIconColor={'white'}
          style={styles.inp}
          label={'Email'}
          iconClass={FontAwesomeIcon}
          iconName={'university'}
          iconColor={'white'}
          iconSize={20}
          inputStyle={{color:"black"}}
          inputPadding={16}
          onChangeText={(text) => setEmail(text)}  
        />
      </View>
      <Text style={styles.high}>Order Information</Text>
      <ScrollView contentContainerStyle={styles.orderInfo}>
        {gg.map(item => (
          
          <CartCard item={item} onPress={() => [removeCart(item),console.log("ds")]}/>
        ))}
        
      </ScrollView>
      <TouchableOpacity onPress={() => payMe(total)}>
      <View style={styles.button}>
        <Text style={styles.btext}>Pay ₹{total} -></Text>
      </View>
      </TouchableOpacity>
      
    </View>
  );
};

export default PaymentFun;
const styles = StyleSheet.create({
  mainCon: {backgroundColor: Colors.white, flex: 1, padding: 20},
  high: {
    fontSize: RFValue(19),
    color: Colors.black,
    fontFamily: Bold,
    marginTop: 10,
    marginBottom: 20,
  },
  innerCon: {
    justifyContent: 'space-around',
  },
  inp: {
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    color:"green"
  },
  orderInfo: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    borderTopColor: 'gray',
    borderTopWidth: 1,
  },
  button:{
    width:widthtodp(Screen_Width-50),
    height:heighttodp(50),
    padding:20,
    backgroundColor:"#ffd86f",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    marginTop:10,
  },
  btext: {
    fontSize: RFValue(15),
    color: Colors.black,
    fontFamily: Bold,
    
  },
});
