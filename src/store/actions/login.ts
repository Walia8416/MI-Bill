import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../axiosconfig';

export const login = createAsyncThunk('login', async () => {
  const result = await axiosInstance.post('/auth/login/');

  console.log(result.data);
  return result.data;
});
