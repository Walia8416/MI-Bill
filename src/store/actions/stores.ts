import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncStorage} from 'react-native';
import {axiosInstance} from '../axiosconfig';

export const getStores = createAsyncThunk('stores', async props => {
  const result = await axiosInstance.get('/store/' + props);
  try {
    await AsyncStorage.setItem('@MyStores', JSON.stringify(result.data.stores));
  } catch (error) {
    console.log('error saving stores');
  }

  return result.data;
});
