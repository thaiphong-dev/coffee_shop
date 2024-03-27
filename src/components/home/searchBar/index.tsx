import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../../theme/theme';

interface Props {
  searchText: string;
  searchCoffee: (search: string) => void;
  resetSearchCoffee: () => void;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBar: React.FC<Props> = ({
  searchText,
  setSearchText,
  searchCoffee,
  resetSearchCoffee,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log('searhc herre');
          searchCoffee(searchText);
        }}>
        <Icon
          style={styles.inputIcon}
          name="search"
          size={FONTSIZE.size_18}
          color={
            searchText.length > 0
              ? COLORS.primaryOrangeHex
              : COLORS.primaryGreyHex
          }
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Find your coffee..."
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          searchCoffee(text);
        }}
        placeholderTextColor={COLORS.primaryLightGreyHex}
        style={styles.textInput}
      />
      {searchText.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            resetSearchCoffee();
          }}>
          <Icon
            style={styles.closeIcon}
            name="close"
            size={FONTSIZE.size_18}
            color={COLORS.primaryLightGreyHex}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  textInput: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  closeIcon: {
    margin: SPACING.space_20,
    fontSize: FONTSIZE.size_16,
  },
});
