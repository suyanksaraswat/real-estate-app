import React from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import COLORS from '../../../consts/colors';
const OnBoardScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />

      {/* Onboarding Image */}
      <Image
        source={require('../../../assets/onboardImage.jpg')}
        style={style.image}
      />

      {/* Indicator container */}
      <View style={style.indicatorContainer}>
        <View style={[style.indicator, style.indicatorActive]} />
        <View style={style.indicator} />
      </View>

      {/* Title and text container */}
      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        {/* Title container */}
        <View>
          <Text style={style.title}>Find best place</Text>
          <Text style={style.title}>at best price</Text>
        </View>

        {/* Text container */}
        <View style={{marginTop: 10}}>
          <Text style={style.textStyle}>
            Get all info in just few clicks
          </Text>
        </View>
      </View>

      {/* Button container */}
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 40,
        }}>
        {/* button */}
        <Pressable onPress={() => navigation.navigate('Login')} style={{ marginBottom: 10 }}>
          <View style={style.btn}>
            <Text style={{color: 'white'}}>Sign in</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <View style={style.btn2}>
            <Text style={{color: 'black'}}>Register</Text>
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

  btn2: {
    height: 60,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2
  },
  title: {fontSize: 32, fontWeight: 'bold'},
  textStyle: {fontSize: 16, color: COLORS.grey},
});
export default OnBoardScreen;
