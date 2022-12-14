import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ImageContainer from '../../helpers/header/ImageContainer';
import {heighttodp, widthtodp} from '../../../constants/Dimenstions';
import {RFValue} from 'react-native-responsive-fontsize';
import BottomUpModal from '../../helpers/bottomupmodal/bottomupmodal';
import ProductCard from '../home/helper/productCard';
import {Screen_Height, Screen_Width} from '../../../constants/constants';
import {Bold} from '../../../constants/Fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const CropCard = ({item, onPress}) => {
  return (
    <View style={styles.cardView}>
      <ImageContainer
        uri={item.imageURL}
        style={{width: widthtodp(120), height: heighttodp(120)}}
      />
      <View style={{justifyContent: 'flex-start', bottom: 0}}>
        <Text
          style={{
            color: 'black',
            fontFamily: Bold,
            width: Screen_Width - 200,
            fontSize: RFValue(17),
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: Bold,
            fontSize: RFValue(15),
            marginBottom: 10,
          }}>
          ₹{item.price}
        </Text>
        <Pressable onPress={onPress}>
          <View style={styles.button}>
            <Text style={styles.btext}>Add to Cart</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CropCard;

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: 'white',
    width: widthtodp(Screen_Width - 50),
    height: heighttodp(150),
    opacity: 0.8,
    flexDirection: 'row',
    margin: 4,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  btext: {
    fontSize: RFValue(13),
    color: Colors.black,
    fontFamily: Bold,
  },
  button: {
    width: widthtodp(100),
    height: heighttodp(30),

    backgroundColor: '#ffd86f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
