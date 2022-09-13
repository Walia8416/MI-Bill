import {View, Text} from 'react-native';
import React from 'react';
import {RouteStackParamList} from '../../../Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './SplashScreens';
import ImageContainer from '../../helpers/header/ImageContainer';
import Images from '../../../constants/icon';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  Bold,
  ExtraBold,
  RobMono,
  SemiBoldItalic,
} from '../../../constants/Fonts';
import {Colors} from '../../../constants/colors';

const SplashScreen: React.FC<RouteStackParamList<'SplashScreen'>> = ({
  navigation,
  route,
}: RouteStackParamList<'SplashScreen'>) => {
  React.useEffect(() => {
    const firstTimeOpen = async () => {
      try {
        const firstTime = await AsyncStorage.getItem('@introData');

        navigation.navigate('SignIn');
      } catch (err) {
        throw err;
      }
    };
    setTimeout(() => {
      firstTimeOpen();
    }, 4000);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {}, 50);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.subsection}>
        <ImageContainer name={Images.logo} style={styles.logos} />
      </View>
    </View>
  );
};
export default SplashScreen;
