import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme/theme';
import ImageBackgroundInfo from '../common/ImageBackgroundInfo';
import {useStore} from '../../store/store';

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

  const toggleFavorite = (isFavorite: boolean, type: string, id: string) => {
    console.log({
      isFavorite,
      type,
      id,
    });

    isFavorite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  console.log('itemInfo', itemInfo);

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
  },
});
