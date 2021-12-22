import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Modal,
} from 'react-native';
import COLORS from '../../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from 'rn-range-slider';

import Thumb from './Slider/Thumb';
import Rail from './Slider/Rail';
import RailSelected from './Slider/RailSelected';

const {width} = Dimensions.get('screen');

import houses from '../../../consts/houses';

const Search = ({navigation}) => {
  const [filterVisible, setFilterVisible] = useState(false);

  const Card = ({house}) => {
    return (
      <Pressable
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', house)}>
        <View style={style.card}>
          <Image source={house.image} style={style.cardImage} />
          <View style={{marginTop: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {house.title}
              </Text>
              <Text
                style={{fontWeight: 'bold', color: COLORS.blue, fontSize: 16}}>
                $1,500
              </Text>
            </View>

            <Text style={{color: COLORS.grey, fontSize: 14, marginTop: 5}}>
              {house.location}
            </Text>

            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={style.facility}>
                <Icon name="hotel" size={18} />
                <Text style={style.facilityText}>2</Text>
              </View>
              <View style={style.facility}>
                <Icon name="bathtub" size={18} />
                <Text style={style.facilityText}>2</Text>
              </View>
              <View style={style.facility}>
                <Icon name="aspect-ratio" size={18} />
                <Text style={style.facilityText}>100m</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />

      <Modal
        transparent={true}
        visible={filterVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setFilterVisible(!filterVisible);
        }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Filter</Text>
            <View style={{flexDirection: 'column', marginBottom: 10}}>
              <Text>Currency range:</Text>
              <Slider
                min={0}
                max={100}
                step={1}
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={() => {}}
                renderNotch={() => {}}
                onValueChanged={(low, high) => {
                  // setLow(low);
                  // setHigh(high);
                }}
              />
            </View>
            <View style={{flexDirection: 'column', marginBottom: 10}}>
              <Text>asd</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              <Pressable
                style={[style.button, style.buttonReset]}
                onPress={() => setFilterVisible(!filterVisible)}>
                <Text style={{color: 'black'}}>Reset</Text>
              </Pressable>
              <Pressable
                style={[style.button, style.buttonConfirm]}
                onPress={() => setFilterVisible(!filterVisible)}>
                <Text style={{color: 'white'}}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}>
        <Pressable
          style={style.backBtn}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Icon name="arrow-back" color={COLORS.white} size={25} />
        </Pressable>

        <View style={style.searchInputContainer}>
          <Icon name="search" color={COLORS.grey} size={25} />
          <TextInput placeholder="Search area, colony, village" />
        </View>

        <Pressable style={style.sortBtn} onPress={() => setFilterVisible(true)}>
          <Icon name="tune" color={COLORS.white} size={25} />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          data={houses}
          renderItem={({item}) => <Card house={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
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
  backBtn: {
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sortBtn: {
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: '100%',
  },
  optionListsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: COLORS.grey,
  },
  activeCategoryListText: {
    color: COLORS.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 40,
  },
  card: {
    height: 250,
    backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  facility: {flexDirection: 'row', marginRight: 15},
  facilityText: {marginLeft: 5, color: COLORS.grey},

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonReset: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
  },
  buttonConfirm: {
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default Search;
