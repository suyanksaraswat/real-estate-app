import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import Login from './src/views/screens/Auth/Login';
import Register from './src/views/screens/Auth/Register';
import Verify from './src/views/screens/Auth/Verify';
import Search from './src/views/screens/Search';

const Stack = createStackNavigator();

const App = () => {
  const [token, setToken] = useState(true);

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    setToken(token);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}>
        {token ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            <Stack.Screen name="Search" component={Search} />
          </>
        ) : (
          <>
            <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Verify" component={Verify} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
