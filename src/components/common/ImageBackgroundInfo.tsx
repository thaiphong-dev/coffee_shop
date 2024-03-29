import {
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../../theme/theme';

interface Props {
  isBack: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  id: string;
  favorite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: string;
  ratings_count: string;
  roasted: string;
  backHander?: any;
  togglefavorites?: any;
}
const ImageBackgroundInfo: React.FC<Props> = props => {
  console.log('props.imagelink_portrait', props.imagelink_portrait);

  return (
    <View>
      <ImageBackground
        style={styles.itemBackgroundImage}
        source={props.imagelink_portrait}>
        {props.isBack ? (
          <View style={styles.backwithHeartIcon}>
            <TouchableOpacity
              style={styles.touchOpacityComponent}
              onPress={() => {
                props.backHander();
              }}>
              <Icon
                name="chevron-left"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchOpacityComponent}
              onPress={() => {
                props.togglefavorites(props.favorite, props.type, props.id);
              }}>
              <Icon
                name="heart"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.backwithoutHeartIcon}>
            <TouchableOpacity style={styles.touchOpacityComponent}>
              <Icon
                name="heart"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
  itemBackgroundImage: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  touchOpacityComponent: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    width: 30,
    height: 30,
    borderRadius: BORDERRADIUS.radius_8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backwithHeartIcon: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backwithoutHeartIcon: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
