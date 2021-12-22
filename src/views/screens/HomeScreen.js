import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('screen');
import houses from '../../consts/houses';
import {dashboardProperties} from '../../api';

const HomeScreen = ({navigation}) => {
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [favoriteProperties, setFavoriteProperties] = useState([]);

  useEffect(async () => {
    try {
      const res = await dashboardProperties();
      console.log('#####res-', res);
      setFavoriteProperties(res.data.favoriteProperties);
      setRecommendedProperties(res.data.recommendedProperties);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const optionsList = [
    {title: 'Home', img: require('../../assets/home.jpeg')},
    {title: 'Land', img: require('../../assets/land.jpg')},
    {title: 'Home', img: require('../../assets/home.jpeg')},
    {title: 'Land', img: require('../../assets/land.jpg')},
  ];
  const categoryList = ['Recommended', 'Favorites'];

  const ListCategories = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    return (
      <View style={style.categoryListContainer}>
        {categoryList.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedCategoryIndex(index)}>
            <Text
              style={[
                style.categoryListText,
                index == selectedCategoryIndex && style.activeCategoryListText,
              ]}>
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const ListOptions = () => {
    return (
      <View style={style.optionListsContainer}>
        {optionsList.map((option, index) => (
          <View style={style.optionsCard} key={index}>
            <Image source={option.img} style={style.optionsCardImage} />
            <Text style={{marginTop: 5, fontSize: 12}}>{option.title}</Text>
          </View>
        ))}
      </View>
    );
  };

  const Card = ({item}) => {
    console.log('##item-', item)
    return (
      <Pressable
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', item)}>
        <View style={style.card}>
          <Image source={require('../../assets/house1.jpg')} style={style.cardImage} />
          <View style={{marginTop: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item.propertyType}
              </Text>
              <Text
                style={{fontWeight: 'bold', color: COLORS.blue, fontSize: 16}}>
                {item.kindOfProperty}
              </Text>
            </View>

            <Text style={{color: COLORS.grey, fontSize: 14, marginTop: 5}}>
              {item.location?.locality}, {item.location?.city}
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
                <Text style={style.facilityText}>{item.area}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />
      <View style={style.header}>
        <View>
          <Text style={{color: COLORS.grey}}>Location</Text>
          <Text style={{color: COLORS.dark, fontSize: 20, fontWeight: 'bold'}}>
            Bhilwara
          </Text>
        </View>
        <Image
          style={style.profileImage}
          source={require('../../assets/person.jpg')}
        />
      </View>
      <Pressable onPress={() => navigation.navigate('Search')}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View style={style.searchInputContainer}>
            <Icon name="search" color={COLORS.grey} size={25} />
            <Text style={{color: 'grey'}}>Search area, colony, village</Text>
          </View>
        </View>
      </Pressable>

      <ListOptions />
      <ListCategories />

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
          data={favoriteProperties}
          renderItem={({item}) => <Card item={item} />}
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
    width: width / 4 - 20,
    elevation: 15,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  optionsCardImage: {
    height: 50,
    borderRadius: 10,
    width: '100%',
  },
  optionListsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
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
});
export default HomeScreen;
