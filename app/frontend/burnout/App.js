// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import MyStack from './components/stack.js';
import React from 'react';

export const APIURL='https://pitwall.connorgannaway.net';
// APIURL export everywhere so we can concatenate extensions and variables to query api

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlignVertical: 'top'
// }
