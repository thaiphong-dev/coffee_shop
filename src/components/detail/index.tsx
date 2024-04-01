import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import ImageBackgroundInfo from '../common/ImageBackgroundInfo';
import {useStore} from '../../store/store';
import PaymentFooter from './paymentFooter';

interface Props {
  navigation: any;
  route: any;
  itemInfo: any;
}
const Details: React.FC<Props> = ({navigation, itemInfo}) => {
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const toggleFavorite = (isFavorite: boolean, type: string, id: string) => {
    isFavorite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(itemInfo.prices[0]);

  const addToCartHandler = (data: any) => {
    console.log('price', [{...price, quantity: 1}]);

    addToCart({...data, prices: [{...price, quantity: 1}]});
    calculateCartPrice();
    navigation.navigate('Cart');
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <ImageBackgroundInfo
          isBack={true}
          imagelink_portrait={itemInfo.imagelink_portrait}
          type={itemInfo.type}
          id={itemInfo.id}
          favorite={itemInfo.favorite || itemInfo.favourite}
          name={itemInfo.name}
          special_ingredient={itemInfo.special_ingredient}
          ingredients={itemInfo.ingredients}
          average_rating={itemInfo.average_rating}
          ratings_count={itemInfo.ratings_count}
          roasted={itemInfo.roasted}
          backHander={() => {
            navigation.pop();
          }}
          togglefavorites={toggleFavorite}
        />
        <View style={styles.footerInfo}>
          <Text style={styles.decriptionText}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc(prev => !prev)}>
              <Text style={styles.decriptionText}>{itemInfo.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc(prev => !prev)}>
              <Text style={styles.decriptionText} numberOfLines={3}>
                {itemInfo.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.inforTitle}>Size</Text>

          <View style={styles.sizeOuterContainer}>
            {itemInfo?.prices?.map((data: any) => (
              <TouchableOpacity
                onPress={() => setPrice(data)}
                key={data.size}
                style={[
                  styles.sizeBox,
                  {
                    borderColor:
                      data.size === price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}>
                <Text
                  style={[
                    styles.sizeText,
                    {
                      fontSize:
                        itemInfo.type === 'Bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size === price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to cart"
          buttonPressHandler={() => addToCartHandler(itemInfo)}
        />
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  footerInfo: {
    padding: SPACING.space_20,
  },
  inforTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  decriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  sizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  sizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    justifyContent: 'center',
    alignItems: 'center',
    height: SPACING.space_20 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
