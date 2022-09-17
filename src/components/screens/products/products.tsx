import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

import {Colors} from '../../../constants/colors';
import Header from '../../helpers/header/Header';
import React, {useEffect, useRef, useState} from 'react';
import {RouteStackParamList} from '../../../Routes';
import {Styles} from '../../../styles/homescreen';
import {SafeAreaView} from 'react-native-safe-area-context';

import {heighttodp, widthtodp} from '../../../constants/Dimenstions';
import {Screen_Height, Screen_Width} from '../../../constants/constants';
import ImageContainer from '../../helpers/header/ImageContainer';
import Images from '../../../constants/icon';
import {RFValue} from 'react-native-responsive-fontsize';
import {Bold} from '../../../constants/Fonts';
import DropdownMenu from 'react-native-dropdown-menu';
import BarcodeScanner from 'react-native-scan-barcode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cropData} from './cropData';
import CropCard from './cropsCard';
import {useAppSelector} from '../../../store/store';
import {useDispatch} from 'react-redux';
import {getProducts} from '../../../store/actions/products';
import Loading from '../weather/Loading';
const Products: React.FC<RouteStackParamList<'Products'>> = ({
  navigation,
  route,
}: RouteStackParamList<'Products'>) => {
  const [shadow, setShadow] = React.useState(false);
  const [scans, setScan] = React.useState(false);
  const [cat, setCat] = React.useState('Laptop');
  const [current, setCurrent] = useState([]);
  const [cart, setCart] = useState([]);
  const {products} = useAppSelector(state => state.products);
  const dispatch = useDispatch();
  const {sid} = route.params;
  var data = [['Laptop', 'Phones', 'Audio']];
  console.log(sid._id);

  const addCart = async ss => {
    try {
      console.log(ss);
      await AsyncStorage.setItem('Cart', JSON.stringify(ss));
    } catch (e) {
      console.log('fail save');
    }
  };


  const getData = async () => {
    try {
      dispatch(getProducts(sid._id));
      getProducted(sid._id);
    } catch (e) {
      console.log('errors');
    }
  };

  const getProducted = async gg => {
    try {
      const x = await AsyncStorage.getItem(gg);
      setCurrent(JSON.parse(x));
      return x;
    } catch (e) {
      console.log('error in storing store details');
    }
  };
  const setProducts = async gg => {
    try {
      await AsyncStorage.setItem(sid._id, JSON.stringify(gg));
    } catch (e) {
      console.log('error in storing store details');
    }
  };
  useEffect(() => {
    getData();
    console.log(products);
  }, []);

  useEffect(() => {
    setProducts(products.products);
  }, [products]);

  const barcodeReceived = e => {
    if (e) {
      const found = current.find(obj => {
        return obj.SSN == e.data;
      });
      if (found) {
        Alert.alert('Match Found ' + found.name);
      } else {
        Alert.alert('NO PRODUCT FOUND ');
      }

      setScan(false);
    }
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
  };

  if (current && current?.length > 0) {
    return (
      <SafeAreaView style={styles.mainCon}>
        {scans ? (
          <BarcodeScanner
            onBarCodeRead={barcodeReceived}
            style={{flex: 1}}
            torchMode={'off'}
            cameraType={'back'}
          />
        ) : null}

        <Header
          testID={'menu'}
          navigation={navigation}
          scroll={shadow}
          creds={false}
          title={'Product Selection'}
        />
        <View style={styles.innercon}>
          <TouchableOpacity onPress={() => setScan(!scans)}>
            <View style={styles.card}>
              <ImageContainer
                name={Images.barcode}
                style={{width: widthtodp(64), height: heighttodp(64)}}
              />
              <Text style={styles.high}>Scan Barcode</Text>
            </View>
          </TouchableOpacity>
        </View>
        <DropdownMenu
          style={{flex: 1, marginLeft: 10}}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          // arrowImg={}
          // checkImage={}
          optionTextStyle={{width: Screen_Width - 50, fontSize: RFValue(15)}}
          titleStyle={{
            width: Screen_Width - 50,
            fontSize: RFValue(18),
            elevation: 5,
          }}
          maxHeight={100}
          handler={(selection, row) => setCat(data[selection][row])}
          data={data}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {current.map(item =>
                cat == item.category ? (
                  
                    <CropCard item={item} onPress={cart.push(item)}/>
                 
                ) : null,
              )}
            </View>
          </ScrollView>
        </DropdownMenu>
        <TouchableOpacity onPress={() => [addCart(cart),navigation.navigate("Payment"),console.log(cart)]}>
          <View style={styles.button}>
            <Text style={{fontSize: RFValue(20), fontFamily: Bold}}>
              Payment ->
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Loading />
    </View>
  );
};

export default Products;

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
  mainCon: {backgroundColor: Colors.white, flex: 1},
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
