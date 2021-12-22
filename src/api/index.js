import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'http://192.168.29.126:3000';

//auth
export const login = async values => {
  const res = await axios.post(`${url}/api/user/login`, values);
  return res;
};

//properties
export const dashboardProperties = async () => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios.get(`${url}/api/properties/dashboard`, {
    headers: {token},
  });
  return res;
};
