import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../theme/theme';
import ImageBackgroundInfo from '../common/ImageBackgroundInfo';

interface Props {
  navigation: any;
  route: any;
  itemInfo: any;
}
const Details: React.FC<Props> = ({navigation, route, itemInfo}) => {
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
          favorite={itemInfo.favorite}
          name={itemInfo.name}
          special_ingredient={itemInfo.special_ingredient}
          ingredients={itemInfo.ingredients}
          average_rating={itemInfo.average_rating}
          ratings_count={itemInfo.ratings_count}
          roasted={itemInfo.roasted}
          backHander={() => {
            navigation.pop();
          }}
          //   togglefavorites={(favorite: boolean, type: string, id: string) => {
          //     favorite ?
          //   }}
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
