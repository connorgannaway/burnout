import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BaseCard from './components/card';
import LeaguesScreen from './screens/LeaguesScreen';
import MyStack from './components/stack.js'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TestScreen from "./screens/TestScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //   <View style={styles.container}>
    //   <Text>Welcome to the burnout app</Text>
    //   <Text></Text>
    //   <StatusBar style="auto" />
    //   {/* <BaseCard /> */}
    //   {/* <LeaguesScreen /> */}
      <MyStack />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'top',
  },
});
