import TopBar  from '../components/topbar';
import BottomBar  from '../components/bottombar';
import BaseCard from '../components/card';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'space-between',
	},
	// topBar: {
	// 	flexDirection: 'row',
	// 	width: '100%',
	// 	padding: 10,
	// 	paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	// 	justifyContent: 'space-between',
	// 	alignItems: 'center',
	// 	borderBottomWidth: 1,
	// 	borderColor: '#eee',
	// 	backgroundColor: '#fff',
	// },
	// logo: {
	// 	width: 50,
	// 	height: 50,
	// 	resizeMode: 'contain',
	// },
	// headerText: {
	// 	fontSize: 20,
	// 	fontWeight: 'bold',
	// },
	// iconContainer: {
	// 	flexDirection: 'row',
	// 	width: 60,
	// 	justifyContent: 'space-between',
	// },
});

export default function HomeScreen({ navigation }) {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<View style={styles.container}>
				{/* Put things that should be rendered into the ScrolLView element */}
				<ScrollView style={styles.content}>
					<Text>Body Text</Text>
					{Array.from({ length: 50 }).map((_, i) => (
						<Text key={i} style={styles.contentText}>
                        Render stuff here {i + 1}
						</Text>
					))}
					<BaseCard 
						navigation={navigation}
						name={'Formula 1'}
						body={'Click to view the Formula 1 League Page'}
						bgcolor={'#ff00ff'}
						where={'LeaguesScreen'}
					/>
				</ScrollView>
				<StatusBar style="auto" />
			</View>
		</SafeAreaView>
	);
}

