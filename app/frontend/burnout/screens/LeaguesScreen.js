import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BaseCard from '../components/card';

// import TestScreen from "./TestScreen";
// const Stack = createNativeStackNavigator();


export default function LeaguesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text></Text>
      <Button
        title="Go to Test"
        onPress={() => navigation.navigate("TestScreen")}
      />
      <BaseCard navigation={navigation} name={"this is the actual card"}/>
      <BaseCard navigation={navigation} name={"f1"}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0.25,
    flexShrink: 1,
  },
});
