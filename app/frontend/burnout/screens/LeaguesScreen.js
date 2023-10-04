import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import BaseCard from '../components/card';



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


const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: screen.height,
    width: screen.width,
    flexGrow: 1,
    flexShrink: 1,
  },
});
