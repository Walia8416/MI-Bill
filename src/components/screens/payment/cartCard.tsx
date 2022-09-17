import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
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
import Images from '../../../constants/icon';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const CartCard = ({item, onPress}) => {
  return (
    <View style={styles.cardView}>
      <ImageContainer
        uri={item.imageURL}
        style={{width: widthtodp(40), height: heighttodp(40)}}
      />
      <View style={{justifyContent: 'flex-start'}}>
        <Text
          style={{
            width: widthtodp(Screen_Width - 200),
            color: 'black',
            fontFamily: Bold,
            fontSize: RFValue(10),
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: Bold,
            fontSize: RFValue(8),
          }}>
          ₹{item.price}
        </Text>
      </View>
      <Pressable onPress={onPress}>
        <ImageContainer
          name={Images.cross}
          style={{width: widthtodp(24), height: heighttodp(24)}}
        />
      </Pressable>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: 'white',
    width: widthtodp(Screen_Width - 100),
    height: heighttodp(50),
    opacity: 0.8,
    flexDirection: 'row',
    margin: 4,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
