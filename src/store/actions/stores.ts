import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../axiosconfig';

export const getStores = createAsyncThunk('stores', async props => {
  console.log({props});
  const result = await axiosInstance.get('/store/');

  console.log(result.data);
  return result.data;
});
