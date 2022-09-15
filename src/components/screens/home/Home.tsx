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

const {height} = Dimensions.get('window');

const Home: React.FC<RouteStackParamList<'Home'>> = ({
  navigation,
}: RouteStackParamList<'Home'>) => {
  const [shadow, setShadow] = React.useState(false);
  const {stores} = useAppSelector(state => state.stores);
  const [current, setCurrent] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStores());
  }, []);
  console.log(stores);
  const loading = stores.length === 0;
  useEffect(() => {
    setCurrent(stores.stores);
  }, [stores]);

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
            <TouchableOpacity>
              <ProductCard item={item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
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
