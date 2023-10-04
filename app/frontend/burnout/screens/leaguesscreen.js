import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import BaseCard from '../components/card';


export default function LeaguesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} >
        {/* This is where the cards for the leagues will go
            currently we have cards for Formula 1, NASCAR, 
            MotoGP and IndyCar */}
        <BaseCard 
          navigation={navigation}
          name={"Formula 1"}
          body={"Click to view the Formula 1 League Page"}
          bgcolor={'#ff1801'}
          where={'leaguemasterscreen'}
        />
        <BaseCard 
          navigation={navigation} 
          name={"NASCAR"}
          body={"Click to view the NASCAR League Page"}
          bgcolor={'#e4002b'}
          where={'TestScreen'}
        />
        <BaseCard 
          navigation={navigation} 
          name={"MotoGP"}
          body={"Click to view the MotoGP League Page"}
          bgcolor={'#E0144C'}
          where={'TestScreen'}
        />
        <BaseCard 
          navigation={navigation} 
          name={"IndyCar"}
          body={"Click to view the IndyCar League Page"}
          bgcolor={'#b92a30'}
          where={'TestScreen'}
        />
      <StatusBar style="auto" />
    </ScrollView>
    </SafeAreaView>
  );
}


const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0d0d0',
    alignItems: 'center',
    height: screen.height,
    width: screen.width,
  },
  scrollView: {
    backgroundColor: '#d0d0d0',
  },
});
