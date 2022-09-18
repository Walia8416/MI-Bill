import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {Colors} from '../../../constants/colors';
import Header from '../../helpers/header/Header';
import React, {useEffect, useRef, useState} from 'react';
import {RouteStackParamList} from '../../../Routes';
import {Styles} from '../../../styles/homescreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bold, RobMono} from '../../../constants/Fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {Screen_Height} from '../../../constants/constants';
import {getorders} from '../../../store/actions/getOrders';
import {useAppSelector} from '../../../store/store';
import {useDispatch} from 'react-redux';
import OrderCard from './orderCard';
import Loading from '../home/helper/Loading';

const Store: React.FC<RouteStackParamList<'Store'>> = ({
  navigation,
}: RouteStackParamList<'Store'>) => {
  const [shadow, setShadow] = React.useState(false);
  const {orders} = useAppSelector(state => state.orders);
  const [current, setCurrent] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const dataToken = await AsyncStorage.getItem('Tokens');
      const opID = await AsyncStorage.getItem('Users');
      if (dataToken !== null) {
        dispatch(getorders(opID));
        getStored();
      } else {
        console.log('NO ACTIVE token found');
      }
    } catch (e) {
      console.log('errors');
    }
  };
  const getStored = async () => {
    try {
      const x = await AsyncStorage.getItem('PrevOrders');
      if (x) {
        setCurrent(JSON.parse(x));
      }

      return x;
    } catch (e) {
      console.log('error in storing store details');
    }
  };

  const setStores = async gg => {
    try {
      await AsyncStorage.setItem('PrevOrders', JSON.stringify(gg));
    } catch (e) {
      console.log('error in storing store details');
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setStores(orders.orders);
  }, [orders]);

  if (current && current?.length > 0) {
    return (
      <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
        <Header
          testID={'menu'}
          navigation={navigation}
          scroll={shadow}
          creds={true}
          title={'Order History'}
        />
        <View style={styles.mainCon}>
          <ScrollView>
            {current.map(item => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PdfView', {
                    f: `/storage/emulated/0/Android/data/com.mibill/files/${item.invoiceId}.pdf`,
                  })
                }>
                <OrderCard item={item} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Loading />
    </View>
  );
};

export default Store;
const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },

  headText: {
    marginBottom: 20,
    fontSize: RFValue(25),
    color: Colors.black,
    fontFamily: Bold,
  },
});
