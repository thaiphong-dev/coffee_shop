import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  id: string;
  index: string;
  type: string;
  roasted: string;
  imagelink_square: ImageProps;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
}

const CARD_WIDTH = Dimensions.get('window').width * 0.32;
const CoffeeCard: React.FC<Props> = props => {
  //   console.log('props', props);

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.cardContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={props.imagelink_square}
        style={styles.cardImageBG}
        resizeMode="cover">
        <View style={styles.cardRatingContainer}>
          <Icon
            name="star"
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_18}
          />
          <Text style={styles.cardRatingText}>{props.average_rating}</Text>
        </View>
      </ImageBackground>
      <Text>{props.name}</Text>
      <Text>{props.special_ingredient}</Text>
      <View>
        <Text>
          $ <Text>{props.price}</Text>
        </Text>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  cardContainer: {},
  cardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  cardRatingContainer: {},
  cardRatingText: {},
});
