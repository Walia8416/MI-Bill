import {
  Animated,
  Dimensions,
  FlatList,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../../../constants/colors';
import Header from '../../helpers/header/Header';
import React, {useEffect, useState} from 'react';
import {RouteStackParamList} from '../../../Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {storeData} from './helper/carData';
import ProductCard from './helper/productCard';
import {ScrollView} from 'react-native-gesture-handler';
import {getStores} from '../../../store/actions/stores';
import {RFValue} from 'react-native-responsive-fontsize';
import {Bold, RobMono} from '../../../constants/Fonts';
import {store, useAppDispatch, useAppSelector} from '../../../store/store';
import {useDispatch} from 'react-redux';
import Loading from './helper/Loading';

const {height} = Dimensions.get('window');

const Home: React.FC<RouteStackParamList<'Home'>> = ({
  navigation,
  route,
}: RouteStackParamList<'Home'>) => {
  const [shadow, setShadow] = React.useState(false);
  const {stores} = useAppSelector(state => state.stores);
  const [current, setCurrent] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const dataToken = await AsyncStorage.getItem('Tokens');
      const opID = await AsyncStorage.getItem('Users');
      const storeDets = await AsyncStorage.getItem('Stores');

      if (dataToken !== null) {
        console.log(dataToken);
        console.log(opID);
        dispatch(getStores(opID));
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
      const x = await AsyncStorage.getItem('Stores');
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
      await AsyncStorage.setItem('Stores', JSON.stringify(gg));
    } catch (e) {
      console.log('error in storing store details');
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setStores(stores.stores);
  }, [stores]);

  if (current && current?.length > 0) {
    return (
      <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
        <Header
          testID={'menu'}
          navigation={navigation}
          scroll={shadow}
          creds={true}
          title={'Create Orders'}
        />
        <View style={styles.mainCon}>
          <Text style={styles.headText}>Select MI Store</Text>

          <ScrollView>
            {current.map(item => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Products', {sid: item})}>
                <ProductCard item={item} />
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

export default Home;
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
