import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../../theme/theme';
import CoffeeCard from '../../common/CoffeeCard';
import {useStore} from '../../../store/store';

interface Props {
  data: any;
  cusStyles?: any;
  listRef?: any;
  navigation?: any;
}
const CustomList: React.FC<Props> = ({
  data,
  cusStyles,
  listRef,
  navigation,
}) => {
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const addToCartHandler = (data: any) => {
    addToCart({...data, prices: [{...data.prices[2], quantity: 1}]});
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${data.name} is added to cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  return (
    <>
      <FlatList
        ref={listRef}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}> No Coffee Available</Text>
          </View>
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        contentContainerStyle={[styles.flatListCoffee, cusStyles]}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.push('Details', {
                index: item.index,
                id: item.id,
                type: item.type,
              })
            }>
            <CoffeeCard
              id={item.id}
              index={item.index as string}
              type={item.type}
              roasted={item.roasted}
              imagelink_square={item.imagelink_square}
              name={item.name}
              special_ingredient={item.special_ingredient}
              average_rating={item.average_rating}
              prices={item.prices[2]}
              buttonPressHandler={() => {
                addToCartHandler(item);
              }}
            />
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default CustomList;

const styles = StyleSheet.create({
  flatListCoffee: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  emptyText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    borderBottomWidth: 2,
    marginBottom: SPACING.space_4,
    paddingBottom: SPACING.space_4,
  },
  emptyContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 2,
  },
});
