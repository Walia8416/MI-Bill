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
import {cropData} from './cropData';
import CropCard from './cropsCard';

import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useDispatch} from 'react-redux';
import {getForecast} from '../../../store/actions/stores';
import {heighttodp, widthtodp} from '../../../constants/Dimenstions';
import {Screen_Height, Screen_Width} from '../../../constants/constants';
import ImageContainer from '../../helpers/header/ImageContainer';
import Images from '../../../constants/icon';
import {RFValue} from 'react-native-responsive-fontsize';
import {Bold} from '../../../constants/Fonts';
import DropdownMenu from 'react-native-dropdown-menu';
const Products: React.FC<RouteStackParamList<'Products'>> = ({
  navigation,
  route,
}: RouteStackParamList<'Products'>) => {
  const [shadow, setShadow] = React.useState(false);
  const {sid} = route.params;
  var data = [['Laptops', 'Phones', 'Audio']];
  console.log(sid);
  return (
    <SafeAreaView style={styles.mainCon}>
      <Header
        testID={'menu'}
        navigation={navigation}
        scroll={shadow}
        creds={false}
        title={'Product Selection'}
      />
      <View style={styles.innercon}>
        <TouchableOpacity>
          <View style={styles.card}>
            <ImageContainer
              name={Images.barcode}
              style={{width: widthtodp(64), height: heighttodp(64)}}
            />
            <Text style={styles.high}>Scan Barcode</Text>
          </View>
        </TouchableOpacity>
        <DropdownMenu
          style={{flex: 1}}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          // arrowImg={}
          // checkImage={}
          optionTextStyle={{width: Screen_Width - 50}}
          titleStyle={{width: Screen_Width - 50}}
          maxHeight={100}
          handler={(selection, row) => console.log(data[selection][row])}
          data={data}>
          <View style={{flex: 1, width: Screen_Width - 20}}>
            <Text>is the best language in the world</Text>
          </View>
        </DropdownMenu>
      </View>
    </SafeAreaView>
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
    marginBottom: 50,
  },
  mainCon: {backgroundColor: Colors.white, flex: 1},
  innercon: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  high: {
    fontSize: RFValue(19),
    color: Colors.black,
    fontFamily: Bold,
    marginTop: 10,
  },
});
