
     
 
     
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
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../../constants/colors';
import PDFView from 'react-native-view-pdf/lib/index';
import { RadioButton } from 'react-native-paper';
import React, {useEffect, useRef, useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {Bold} from '../../../constants/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi, Sae} from 'react-native-textinput-effects';
import {cropData} from '../products/cropData';
import CartCard from './cartCard';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {heighttodp, widthtodp} from '../../../constants/Dimenstions';
import { Screen_Width } from '../../../constants/constants';


import CustomAlert from '../../helpers/CustomAlert';
import { useAppDispatch } from '../../../store/store';
import { getorders } from '../../../store/actions/getOrders';





const PaymentFun = ({navigation,sid,cart}) => {

 


  
  
  useEffect(() => {
    getCart();
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
      console.log(state)
    });
   
  }, []);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const stripe = useStripe();
  const [value, setValue] = React.useState('first');
  const [cname, setCname] = useState('');
  const [phone, setPhone] = useState('');
  const [caddr, setCaddr] = useState('');
  const [email, setEmail] = useState('');
  const [isOffline, setOfflineStatus] = useState(false);
  const [OPD, setOPD] = useState('');
  const [gg, setGG] = useState([]);
  const [ind, setInd] = useState('');
  const [show, setShow] = useState(false);
  const [fileAlert, setFileAlert] = useState(false);
  const dispatch = useAppDispatch();
  console.log(isOffline);

  
  const viewPD = () => {
    return (
      <View style={{ flex: 1 }}>
        {/* Some Controls to change PDF resource */}
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={resources['file']}
          resourceType={'file'}
          onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
          onError={(error) => console.log('Cannot render PDF', error)}
        />
      </View>
    );
  }
  
  let productHtml = ""
  const generateProducts = () => {
    
      gg.forEach((product) => {
          productHtml += `<tr><td><span class="text-inverse">${product.name}</span><br></td><td class="text-center">???${product.price}</td><td class="text-right">${product.price}</td></tr>`
      })
  }

  generateProducts()

  const removeCart = (bb) => {
    setGG(current =>
      current.filter(item => {
        
        return item._id !== bb._id;
      }),
    );
  };
  const createPDF = async(name) => {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const d = new Date();
    
    let month = months[d.getMonth()];
    let options = {
      html:`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></head><div class="container"><div class="col-md-12"><div class="invoice"><!-- begin invoice-company <div class="invoice-company text-inverse f-w-600"><span class="pull-right hidden-print"><a href="javascript:;" class="btn btn-sm btn-white m-b-10 p-l-5"><i class="fa fa-file t-plus-1 text-danger fa-fw fa-lg"></i> Export as PDF</a><a href="javascript:;" onclick="window.print()" class="btn btn-sm btn-white m-b-10 p-l-5"><i class="fa fa-print t-plus-1 fa-fw fa-lg"></i> Print</a></span>Xiaomi, Inc</div> end invoice-company --><!-- begin invoice-header --><div class="invoice-header"><div class="invoice-from"><small>from</small><address class="m-t-5 m-b-5"><strong class="text-inverse display-6 my-5">Xiaomi, Inc.</strong><br>lorem ipsum<br>${"Bengaluru"}, ${110058}<br>Phone: (123) 456-7890<br></address></div><div class="invoice-to"><small>to</small><address class="m-t-5 m-b-5"><strong class="text-inverse">${cname}</strong><br>${caddr}<br>New Delhi, 110058<br>Phone: ${phone}<br></address></div><div class="invoice-date"><small>Invoice</small><div class="date text-inverse m-t-5">${month} ${d.getDate()},${d.getFullYear()}</div><div class="invoice-detail">#${ind}<br>Product</div></div></div><!-- end invoice-header --><!-- begin invoice-content --><div class="invoice-content"><!-- begin table-responsive --><div class="table-responsive"><table class="table table-invoice"><thead><tr><th>Product Name</th><th class="text-center" width="10%">RATE</th><th class="text-right" width="20%">TOTAL</th></tr></thead><tbody>${productHtml}</tbody></table></div><!-- end table-responsive --><!-- begin invoice-price --><div class="invoice-price"><div class="invoice-price-left"><div class="invoice-price-row"><div class="sub-price"><i class="fa fa-plus text-muted"></i></div><div class="sub-price"><small>PAYPAL FEE (5.4%)</small></div></div></div><div class="invoice-price-right"><small>TOTAL</small> <span class="f-w-600">???${total}</span></div></div><!-- end invoice-price --></div><!-- end invoice-content --><!-- begin invoice-note --><div class="invoice-note">* Make all cheques payable to Xiaomi<br>* Payment is due within 30 days<br>* If you have any questions concerning this invoice, contact  [Name, Phone Number, Email]</div><!-- end invoice-note --><!-- begin invoice-footer --><div class="invoice-footer"><p class="text-center m-b-5 f-w-600">THANK YOU FOR YOUR BUSINESS</p><p class="text-center"><span class="m-r-10"><i class="fa fa-fw fa-lg fa-globe"></i> </span><span class="m-r-10"><i class="fa fa-fw fa-lg fa-phone-volume"></i> T:016-18192302</span><span class="m-r-10"><i class="fa fa-fw fa-lg fa-envelope"></i> rtiemps@gmail.com</span></p></div><!-- end invoice-footer --></div></div></div>`,
      fileName: name,
      directory: '',
    };

    let file = await RNHTMLtoPDF.convert(options)
    console.log(file);
    sendEmail(file);
    navigation.navigate("PdfView",{f:file.filePath});
    setFileAlert(true);
  }

  
  const getCart = async () => {
    try {
      
      const opID = await AsyncStorage.getItem('Users');
      setOPD(opID);
      console.log(cart)
      setGG(cart);
      setInd(String(Date.now()));
      
    } catch (e) {
      console.log('fail save');
    }
  };

  const sendEmail = async (pdfs) => {
    try {
      let formdata = new FormData();
     
      formdata.append('file', {
        name: `${ind}.pdf`,
        type: "document/pdf",
        uri: `file://${pdfs.filePath}`,
      });
      formdata.append("to",email);
      formdata.append("body",`Thank you ${cname} for shopping with Xiaomi generated invoice is available below`)
      formdata.append("subject",`Invoice for Order ID - ${ind}`)
      console.log(formdata);
      const response = await fetch('http://3.108.203.2:8000/api/email/sendemail', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formdata,
      });
     
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e)
     
      console.error('errors');
    } 
  };

  

  const createOrder = async () => {
    try {
      
      const response = await fetch('http://3.108.203.2:8000/api/orders', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          operatorId: OPD,
          storeId: sid,
          invoiceId:ind,
          products:gg,
          cost:String(total),
          customerName:cname,
          customerEmail:email,
          customerAddress:caddr,
          customerPhoneNumber:phone
        }),
      });
      const data = await response.json();
    } catch (e) {
      console.error('errors');
    } 
  };


 
  const payMe = async (tots) => {
    if(cname == ""||email==""||caddr==""||phone=="") {
      Alert.alert("Please fill out all fields!")
    }else {
      if(value == "first"){
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
          createOrder();
          setShow(true);
          createPDF(ind);
          navigation.navigate("Home");
          dispatch(getorders(OPD))
          
        } catch (e) {
          console.error('errors');
        }
      }else {
        createOrder();
        setShow(true);
        createPDF(ind);
        navigation.navigate("Home");
        dispatch(getorders(OPD));
      }
    }
    
  };
  const total = gg.reduce((a,v) =>  a = a + parseInt(v.price) , 0 );
  console.log(name);
  return (
    <View style={styles.mainCon}>
      <ScrollView>
        <CustomAlert visible={show} handleClose={() => setShow(false)} title={"Order Placed"} message={`Invoice has been sent to ${email}. Thanks for shopping with Xiaomi`}/>
        <CustomAlert visible={fileAlert} handleClose={() => setFileAlert(false)} title={"Invoice Downloaded"} message={`Invoice has been saved`}/>
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
        
        <TouchableOpacity onPress={() =>payMe(total)}>
        
        <View style={styles.button}>
          <Text style={styles.btext}>Pay ???{total} -></Text>
        </View>
        </TouchableOpacity>
        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
          <RadioButton.Item label="Card" value="first" disabled={isOffline}/>
          <RadioButton.Item label="Cash" value="second" />
        </RadioButton.Group>
      </ScrollView>
      
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
    width:widthtodp(Screen_Width - 50),
    height:heighttodp(50),
    padding:20,
    backgroundColor:"#ffd86f",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    marginTop:10,
  },
  cbutton:{
    width:widthtodp(Screen_Width - 50),
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
