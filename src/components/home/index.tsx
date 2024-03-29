import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useStore} from '../../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme/theme';
import HeaderBar from '../../components/common/HeaderBar';
import CustomList from './customList';
import MenuBar from './menubar';
import SearchBar from './searchBar';
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
interface Props {
  navigation: any;
}
const Home: React.FC<Props> = ({navigation}) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const [sortEdCoffee, setSortedCoffee] = useState(
    filterCoffeeData(categoryIndex.category, CoffeeList),
  );

  const listRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = (search: string) => {
    if (search !== '') {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({
        index: 0,
        category: categories[0],
      });
      setSortedCoffee([
        ...CoffeeList?.filter((x: any) =>
          x?.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const resetSearchCoffee = () => {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({
      index: 0,
      category: categories[0],
    });
    setSortedCoffee([...CoffeeList]);
    setSearchText('');
  };
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
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          // coffeeList={CoffeeList}
          // filterCoffeeData={filterCoffeeData}
          // setSortedCoffee={setSortedCoffee}
          searchCoffee={searchCoffee}
          resetSearchCoffee={resetSearchCoffee}
        />

        {/* category scroller  */}
        <MenuBar
          listRef={listRef}
          categories={categories}
          setCategoryIndex={setCategoryIndex}
          setSortedCoffee={setSortedCoffee}
          coffeeList={CoffeeList}
          categoryIndex={categoryIndex}
        />

        {/* coffee flat list  */}
        <CustomList
          key={categoryIndex.category}
          listRef={listRef}
          data={sortEdCoffee}
          navigation={navigation}
        />
        <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>
        {/* coffee beans flat list  */}
        <CustomList
          listRef={listRef}
          data={BeanList}
          navigation={navigation}
          cusStyles={{marginBottom: tabBarHeight}}
        />
      </ScrollView>
    </View>
  );
};

export default Home;

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

  coffeeBeansTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.secondaryLightGreyHex,
    marginTop: SPACING.space_20,
    marginLeft: SPACING.space_30,
  },
});
