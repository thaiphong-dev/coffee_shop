import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CoffeeCard from '../components/CoffeeCard';
const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i]?.name] === undefined) {
      temp[data[i]?.name] = 1;
    } else {
      temp[data[i]?.name]++;
    }
  }

  let categories = Object.keys(temp);

  categories.unshift('All');

  return categories;
};

const filterCoffeeData = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    return data?.filter((x: any) => x.name === category);
  }
};
const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 1,
    category: categories[1],
  });

  const [sortEdCoffee, setSortedCoffee] = useState(
    filterCoffeeData(categoryIndex.category, CoffeeList),
  );
  console.log('sortEdCoasdffee', sortEdCoffee);

  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewFlex}>
        {/* App header  */}
        <HeaderBar />
        <Text style={styles.screenTitle}>
          Find the best {'\n'}coffee for you
        </Text>

        {/* search bar  */}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Icon
              style={styles.inputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find your coffee..."
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInput}
          />
        </View>

        {/* category scroller  */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}>
          {categories?.map((data, index) => (
            <View key={index} style={styles.categoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.categoryScrollViewItem}
                onPress={() => {
                  setCategoryIndex({
                    index,
                    category: categories[index],
                  });
                  setSortedCoffee([
                    ...filterCoffeeData(categories[index], CoffeeList),
                  ]);
                }}>
                <Text
                  style={[
                    styles.categoryText,
                    categoryIndex.index === index
                      ? {
                          color: COLORS.primaryOrangeHex,
                          borderBottomColor: COLORS.primaryOrangeHex,
                        }
                      : {},
                  ]}>
                  {data}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* coffee flat list  */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortEdCoffee}
          contentContainerStyle={styles.flatListConffee}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity>
              <CoffeeCard
                id={item.id}
                index={item.index as string}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                name={item.name}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.price}
                buttonPressHandler={() => {}}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  inputContainer: {
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  textInput: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  categoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_10,
  },
  categoryScrollViewItem: {
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    borderBottomWidth: 2,
    marginBottom: SPACING.space_4,
    paddingBottom: SPACING.space_4,
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  flatListConffee: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
});
