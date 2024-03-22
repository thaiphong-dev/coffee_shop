import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../store/store';
const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);

  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const [sortEdCoffee, setSortedCoffee] = useState();
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
