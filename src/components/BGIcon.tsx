import {StyleSheet, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, SPACING} from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  name: string;
  color: string;
  size: number;
  BGColor: string;
}
const BGIcon: React.FC<Props> = props => {
  return (
    <View style={[styles.iconBG, {backgroundColor: props.BGColor}]}>
      <Icon name={props.name} color={props.color} size={props.size} />
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  iconBG: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8,
  },
});
