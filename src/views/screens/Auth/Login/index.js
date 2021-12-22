import React, {useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../../../../api';
import COLORS from '../../../../consts/colors';

const Login = ({navigation}) => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    try {
      const res = await login({
        phone,
        password,
      });
      await AsyncStorage.setItem('token', res.data);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />
      <View style={{paddingHorizontal: 20, paddingTop: 40}}>
        <View>
          <Text style={style.title}>Login</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={style.textStyle}>Your phone number</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
            }}>
            <View style={style.searchInputContainer}>
              <Icon name="phone" color={COLORS.grey} size={16} />
              <TextInput
                placeholder="Phone number"
                keyboardType="numeric"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>
        </View>
        <View style={{marginTop: 8}}>
          <Text style={style.textStyle}>Password</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
            }}>
            <View style={style.searchInputContainer}>
              <Icon name="lock" color={COLORS.grey} size={16} />
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 40,
        }}>
        <Pressable onPress={handleLogin}>
          <View style={style.btn}>
            <Text style={{color: 'white'}}>Login</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    height: 420,
    width: '100%',
    borderBottomLeftRadius: 100,
  },
  indicatorContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  indicator: {
    height: 3,
    width: 30,
    backgroundColor: COLORS.grey,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  indicatorActive: {
    backgroundColor: COLORS.dark,
  },
  btn: {
    height: 60,
    marginHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 32, fontWeight: 'bold'},
  textStyle: {fontSize: 16, color: COLORS.grey},
});
export default Login;
