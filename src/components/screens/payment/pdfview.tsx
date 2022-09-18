import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Colors} from '../../../constants/colors';
import Header from '../../helpers/header/Header';
import React, {useEffect, useRef, useState} from 'react';
import {RouteStackParamList} from '../../../Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
import {heighttodp, widthtodp} from '../../../constants/Dimenstions';
import {Bold} from '../../../constants/Fonts';
import PDFView from 'react-native-view-pdf/lib/index';
import {StripeProvider} from '@stripe/stripe-react-native';
import PdfViewFun from './paymenFun';
import {Screen_Height} from '../../../constants/constants';
const PdfView: React.FC<RouteStackParamList<'PdfView'>> = ({
  navigation,
  route,
}: RouteStackParamList<'PdfView'>) => {
  const {f} = route.params;
  console.log(f);
  const resources = {
    file: f,
  };

  return (
    <SafeAreaView style={styles.mainCon}>
      <Header
        testID={'menu'}
        navigation={navigation}
        creds={false}
        title={'Invoice Viewer'}
      />
      <View style={{flex: 1}}>
        <PDFView
          fadeInDuration={250.0}
          style={{flex: 1}}
          resource={resources['file']}
          resourceType={'file'}
          onLoad={() => console.log(`PDF rendered from file`)}
          onError={error => console.log('Cannot render PDF', error)}
        />
      </View>
    </SafeAreaView>
  );
};

export default PdfView;

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
    marginBottom: 20,
  },
  mainCon: {backgroundColor: Colors.white, flex: 1, height: Screen_Height * 2},
  innercon: {
    justifyContent: 'flex-start',
    alignItems: 'center',

    padding: 20,
  },
  high: {
    fontSize: RFValue(19),
    color: Colors.black,
    fontFamily: Bold,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.mi,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
