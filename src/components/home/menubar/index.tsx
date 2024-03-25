import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../../theme/theme';

interface CategoryIndex {
  index: number;
  category: string;
}
interface Props {
  categories: string[];
  setCategoryIndex: (data: CategoryIndex) => void;
  setSortedCoffee: (data: any) => void;
  coffeeList: any;
  categoryIndex: CategoryIndex;
  listRef: React.MutableRefObject<FlatList<any> | undefined>;
  setRenderKey: React.Dispatch<React.SetStateAction<number>>;
}

const filterCoffeeData = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    return data?.filter((x: any) => x.name === category);
  }
};

const MenuBar: React.FC<Props> = props => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryScrollView}>
      {props?.categories?.map((data: any, index: number) => (
        <View key={index} style={styles.categoryScrollViewContainer}>
          <TouchableOpacity
            style={styles.categoryScrollViewItem}
            onPress={() => {
              props?.listRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
              });
              props.setRenderKey(Math.random());
              props?.setCategoryIndex({
                index,
                category: props?.categories[index],
              });
              props?.setSortedCoffee([
                ...filterCoffeeData(props?.categories[index], props.coffeeList),
              ]);
            }}>
            <Text
              style={[
                styles.categoryText,
                props.categoryIndex.index === index
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
  );
};

export default MenuBar;

const styles = StyleSheet.create({
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
});
