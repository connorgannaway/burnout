/*
    testscreen.js
    Aaron King
    10/27/2023
    Provides a test screen that says test screen for testing obviously.
*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function TestScreen({navigation}) {
	return (
		<View style={styles.container}>
			<Text>DAVID!</Text>
            <Image 
            source={require('../images/reid.jpg')}/>
			<StatusBar style="auto" />
		</View>
	);
}
