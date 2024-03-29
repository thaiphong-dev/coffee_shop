import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';
import {COLORS} from '../theme/theme';
import ImageBackgroundInfo from '../components/common/ImageBackgroundInfo';
import Details from '../components/detail';

const DetailScreen = ({navigation, route}: any) => {
  const itemInfo = useStore((state: any) =>
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route?.params?.index];

  return <Details itemInfo={itemInfo} navigation={navigation} route={route} />;
};

export default DetailScreen;
