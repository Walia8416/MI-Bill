import {
  Dimensions,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Bold} from '../../../constants/Fonts';
import {Container} from '../../../styled_components/layout';
import ImageContainer from './ImageContainer';
import Images from '../../../constants/icon';
import React from 'react';
import {heighttodp, widthtodp} from '../../../constants/Dimenstions';
import {Medium} from '../../../constants/Fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../../constants/colors';

const {width} = Dimensions.get('window');

const Header = ({navigation, onPress, scroll, testID, title, creds}) => {
  return (
    <Container style={[styles.container, {elevation: scroll ? 6 : 10}]}>
      <ImageContainer
        name={Images.menu}
        style={{width: widthtodp(25), height: heighttodp(25)}}
      />
      <View style={styles.flexing}>
        {title ? (
          <Text
            style={{
              fontSize: RFValue(20),
              color: Colors.FeatherWhite,
              fontFamily: Bold,
            }}>
            {title}
          </Text>
        ) : null}
      </View>
    </Container>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    paddingTop: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.mi,
  },
  flexing: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  marketingbtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marketingtext: {
    fontFamily: Medium,
    fontSize: RFValue(14),
    fontWeight: '500',
    color: Colors.DimGray,
  },
});
