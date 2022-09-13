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
} from 'react-native';

import Carousel from '../../helpers/carousel/carousel';
import CarouselItem from '../../helpers/carousel/carouselItem';
import {Colors} from '../../../constants/colors';
import Header from '../../helpers/header/Header';
import React, {useEffect, useState} from 'react';
import {RouteStackParamList} from '../../../Routes';
import {Styles} from '../../../styles/homescreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {carouselData} from './helper/carData';
import ProductCard from './helper/productCard';
import {ScrollView} from 'react-native-gesture-handler';
import {storeData} from '../cart/storeData';
import {RFValue} from 'react-native-responsive-fontsize';
import {RobMono} from '../../../constants/Fonts';

const {height} = Dimensions.get('window');

const Home: React.FC<RouteStackParamList<'Home'>> = ({
  navigation,
}: RouteStackParamList<'Home'>) => {
  const [shadow, setShadow] = React.useState(false);

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <Header
        testID={'menu'}
        navigation={navigation}
        scroll={shadow}
        creds={true}
      />
      <ScrollView>
        
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
