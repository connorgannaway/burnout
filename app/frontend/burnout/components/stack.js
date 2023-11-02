/*
    stack.js
    Caleb Kornegay
    Aaron King
    10/27/2023
    Provides a stack navigator for the different tabs to be nested.
*/
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestScreen from '../screens/testscreen';
import LeaguesScreen from '../screens/leaguesscreen';
import HomeScreen from '../screens/homescreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LeagueMasterScreen from '../screens/leaguemasterscreen';
import DriverMasterScreen from '../screens/drivermasterscreen';
import TeamMasterScreen from '../screens/teammasterscreen';
import RaceScreen from '../screens/racescreen';
import { StyleSheet, View, SafeAreaView, Modal, Text } from 'react-native';
import DateRangePicker from './DateRangePicker';
import SearchBar from './SearchBar';


const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
	iconContainer: {
		flexDirection: 'row',
		width: 60,
		justifyContent: 'space-between',
	},
	headerText: {
		color: 'white',
		fontWeight: '500', 
		fontSize: 20,
	},
});

const ScreenOptions = ( isPickerVisible, setIsPickerVisible, 
    isSearchBarVisible, setIsSearchBarVisible, onRangeSelected ) => ({
	headerBackTitleVisible: false,
	headerTitleAlign: 'center',
	headerTintColor: '#fff',
	headerStyle: {
		backgroundColor: '#ff0000',
	},
	// headerTitle: () => (
	// 	isSearchBarVisible
	// 		? <SearchBar onSearch={(term) => console.log(term)} />
	// 		// set search bar title in text component
	// 		: <Text style={{color: 'white'}}>PLACEMENT TITLE</Text>
	// ),
	headerRight: () => (
		<SafeAreaView>
			<View style={{flexDirection:'row'}}>
				<MaterialCommunityIcons 
					name='magnify' 
					color={'black'} 
					size={25} 
					style={{paddingLeft: 20}}
					onPress={() => setIsSearchBarVisible(!isSearchBarVisible)}
				/>
				<MaterialCommunityIcons 
					name='calendar-today' 
					color={'black'}
					style={{paddingLeft: 20}}
					size={25} 
					onPress={() => setIsPickerVisible(true)}
				/>
			</View>
			{isPickerVisible && (
				<Modal 
					animationType="slide"
					transparent={true}
					visible={isPickerVisible}
					onRequestClose={() => {
						setIsPickerVisible(false);
					}}
				>
					<DateRangePicker onRangeSelected={onRangeSelected} />
				</Modal>
			)}
		</SafeAreaView>
	),
});

function LeagueStack({ navigation }){
	const [isPickerVisible, setIsPickerVisible] = useState(false);
	// const [searchTerm, setSearchTerm] = useState('');
	const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

	const onRangeSelected = (startDate, endDate) => {
		setIsPickerVisible(false);

		const formattedStartDate = startDate.toLocaleDateString();
		const formattedEndDate = endDate.toLocaleDateString();

		alert('Start Date: ' + formattedStartDate + '\nEnd Date: ' + formattedEndDate);
		console.log('Start Date: ' + formattedStartDate + '\nEnd Date: ' + formattedEndDate);
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
		console.log('Searching for: ' + term);
	};

	return (
		<Stack.Navigator 
			initialRouteName='LeaguesScreen'
			screenOptions={ScreenOptions(isPickerVisible, setIsPickerVisible, 
                isSearchBarVisible, setIsSearchBarVisible, onRangeSelected)}
		> 
			<Stack.Screen
				name='LeaguesScreen'
				component={LeaguesScreen}
				options={{
					headerTitle: () => (
						isSearchBarVisible
							? <SearchBar onSearch={(term) => console.log(term)} />
							: <Text style={styles.headerText}>Leagues Page</Text>
					),
					
				}}
			></Stack.Screen>
			<Stack.Screen
				name='TestScreen'
				component={TestScreen}
				initialParams={{newTitle: 'Testing Page'}}
				options={
					({ route }) => ({ 
						headerTitle: () => (
							isSearchBarVisible
								? <SearchBar onSearch={(term) => console.log(term)} />
								: <Text style={styles.headerText}>{route.params.newTitle}</Text>
						)
					})
				}
			></Stack.Screen>
			<Stack.Screen
				name='LeagueMasterScreen'
				component={LeagueMasterScreen}
				initialParams={{newTitle: 'League Master Screen'}}
				options={
					({ route }) => ({ 
						headerTitle: () => (
							isSearchBarVisible
								? <SearchBar onSearch={(term) => console.log(term)} />
								: <Text style={styles.headerText}>{route.params.newTitle}</Text>
						)
					})
				}
			></Stack.Screen>
			<Stack.Screen
				name='TeamMasterScreen'
				component={TeamMasterScreen}
				initialParams={{newTitle: 'Team Master Screen'}}
				options={
					({ route }) => ({ 
						headerTitle: () => (
							isSearchBarVisible
								? <SearchBar onSearch={(term) => console.log(term)} />
								: <Text style={styles.headerText}>{route.params.newTitle}</Text>
						)
					})
				}
			></Stack.Screen>
			<Stack.Screen
				name='DriverMasterScreen'
				component={DriverMasterScreen}
				initialParams={{newTitle: 'Driver Master Screen'}}
				options={
					({ route }) => ({ 
						headerTitle: () => (
							isSearchBarVisible
								? <SearchBar onSearch={(term) => console.log(term)} />
								: <Text style={styles.headerText}>{route.params.newTitle}</Text>
						)
					})
				}
			></Stack.Screen>
			<Stack.Screen
				name='RaceScreen'
				component={RaceScreen}
				// options={{
				// 	title: 'RaceScreen',
				// }}
				options={
					({ route }) => ({ 
						headerTitle: () => (
							isSearchBarVisible
								? <SearchBar onSearch={(term) => console.log(term)} />
								: <Text style={styles.headerText}>{route.params.newTitle}</Text>
						)
					})
				}
			>
			</Stack.Screen>
		</Stack.Navigator>
	);
}

export {LeagueStack};

function HomeStack({ navigation }){
	const [isPickerVisible, setIsPickerVisible] = useState(false);
	// const [searchTerm, setSearchTerm] = useState('');
	const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

	const onRangeSelected = (startDate, endDate) => {
		setIsPickerVisible(false);

		const formattedStartDate = startDate.toLocaleDateString();
		const formattedEndDate = endDate.toLocaleDateString();

		alert('Start Date: ' + formattedStartDate + '\nEnd Date: ' + formattedEndDate);
		console.log('Start Date: ' + formattedStartDate + '\nEnd Date: ' + formattedEndDate);
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
		console.log('Searching for: ' + term);
	};

	return (
		<Stack.Navigator 
			initialRouteName='HomeScreen'
			screenOptions={ScreenOptions(isPickerVisible, setIsPickerVisible, 
                isSearchBarVisible, setIsSearchBarVisible, onRangeSelected)}
		>
			<Stack.Screen
				name='TestScreen'
				component={TestScreen}
				initialParams={{newTitle: 'Testing Page'}}
				options={
					({ route }) => ({ 
						headerTitle: () => (
							isSearchBarVisible
								? <SearchBar onSearch={(term) => console.log(term)} />
								: <Text style={styles.headerText}>{route.params.newTitle}</Text>
						)
					})
				}
			></Stack.Screen>
			<Stack.Screen
				name='LeaguesScreen'
				component={LeaguesScreen}
				options={{
					headerTitle: () => (
						isSearchBarVisible
							? <SearchBar onSearch={(term) => console.log(term)} />
							: <Text style={styles.headerText}>Leagues Page</Text>
					),
					
				}}
			></Stack.Screen>
			<Stack.Screen
				name='HomeScreen'
				component={HomeScreen}
				options={{
					headerTitle: () => (
						isSearchBarVisible
							? <SearchBar onSearch={(term) => console.log(term)} />
							: <Text style={styles.headerText}>Home</Text>
					),
					
				}}
				// options={{
				// 	title: 'Home Page',
				// 	// headerTitle: () => (
				// 	//     <SafeAreaView>
				// 	//         <Image 
				// 	//         style={{width: 75, height: 75, resizeMode: 'contain',}}
				// 	//         source={require('../images/mustangburnout.jpg')}/>
				// 	//     <Text>Burnout!!</Text>
				// 	//     </SafeAreaView>
				// 	// ),

				// }}
			></Stack.Screen>
			<Stack.Screen
				name='LeagueMasterScreen'
				component={LeagueMasterScreen}
				initialParams={{newTitle: 'League Master Screen'}}
				options={
					({ route }) => ({ 
						headerTitle: () => (
							isSearchBarVisible
								? <SearchBar onSearch={(term) => console.log(term)} />
								: <Text style={styles.headerText}>{route.params.newTitle}</Text>
						)
					})
				}
			>
			</Stack.Screen>
			<Stack.Screen
				name='TeamMasterScreen'
				component={TeamMasterScreen}
				initialParams={{newTitle: 'Team Master Screen'}}
				options={
					({ route }) => ({ 
						headerTitle: () => (
							isSearchBarVisible
								? <SearchBar onSearch={(term) => console.log(term)} />
								: <Text style={styles.headerText}>{route.params.newTitle}</Text>
						)
					})
				}
			>
			</Stack.Screen>
			<Stack.Screen
				name='DriverMasterScreen'
				component={DriverMasterScreen}
				initialParams={{newTitle: 'Driver Master Screen'}}
				options={
					({ route }) => ({ 
						headerTitle: () => (
							isSearchBarVisible
								? <SearchBar onSearch={(term) => console.log(term)} />
								: <Text style={styles.headerText}>{route.params.newTitle}</Text>
						)
					})
				}
			></Stack.Screen>
		</Stack.Navigator>
	);
}

export {HomeStack};