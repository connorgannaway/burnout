/*
    topbar.js
    Nick Lindsey
    10/27/2023
    deprecated
*/
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Platform, Modal } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
	topBar: {
		flexDirection: 'row',
		width: '100%',
		padding: 30,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: '#eee',
		backgroundColor: '#fff',
	},
	logo: {
		width: 50,
		height: 50,
		resizeMode: 'contain',
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	iconContainer: {
		flexDirection: 'row',
		width: 60,
		justifyContent: 'space-between',
	},
});

export default function Topbar() {
	return (
		<View style={styles.topBar}>
			<Image style={styles.logo} source={{ uri: uri }} />
			<Text style={styles.headerText}>Home Page</Text>
			<View style={styles.iconContainer}>
				<TouchableOpacity>
					<MaterialIcons name="search" size={24} color="black" />
				</TouchableOpacity>
				<TouchableOpacity>
					<MaterialCommunityIcons name="calendar" size={24} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

