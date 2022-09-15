import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

import {Colors} from '../../../constants/colors';
import Header from '../../helpers/header/Header';
import React, {useEffect, useRef, useState} from 'react';
import {RouteStackParamList} from '../../../Routes';
import {Styles} from '../../../styles/homescreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {cropData} from './cropData';
import CropCard from './cropsCard';

import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useDispatch} from 'react-redux';
import {getForecast} from '../../../store/actions/stores';
import {heighttodp} from '../../../constants/Dimenstions';
import {Screen_Height} from '../../../constants/constants';

const Crops: React.FC<RouteStackParamList<'Crops'>> = ({
  navigation,
}: RouteStackParamList<'Crops'>) => {
  const [shadow, setShadow] = React.useState(false);

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <View>
        <Header
          testID={'menu'}
          navigation={navigation}
          scroll={shadow}
          title={'Cart'}
        />
      </View>
    </SafeAreaView>
  );
};

export default Crops;
