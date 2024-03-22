import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DetailScreen from './src/screens/DetailScreen';
import PaymentScreens from './src/screens/PaymentScreens';
import TabNavigator from './src/navigators/TabNavigator';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreens}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
