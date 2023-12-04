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
import { StyleSheet, View, SafeAreaView, Modal, Text, TouchableOpacity } from 'react-native';
import DateRangePicker from './daterangepicker';
import SearchBar from './searchbar';


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
    isSearchBarVisible, setIsSearchBarVisible, onDateSelected ) => ({
	headerBackTitleVisible: false,
	headerTitleAlign: 'center',
	headerTintColor: '#fff',
	headerStyle: {
		backgroundColor: '#ff0000',
	},
    headerTransparent: false,
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
					// transparent={true}
					visible={isPickerVisible}
					onRequestClose={() => {
						setIsPickerVisible(false);
					}}
				>
					{/* Add an overlay to detect taps outside the DateRangePicker */}
					<TouchableOpacity
						style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
						activeOpacity={1}
						onPressOut={() => {
							setIsPickerVisible(false);
						}}
					>
						<View>
							{/* Pass the onDateSelected handler instead of onRangeSelected */}
							<DateRangePicker onDateSelected={onDateSelected} />
						</View>
					</TouchableOpacity>
				</Modal>
			)}
		</SafeAreaView>
	),
});

function LeagueStack({ navigation }){
	const [isPickerVisible, setIsPickerVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	// const [searchTerm, setSearchTerm] = useState('');
	const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

	const onDateSelected = (date) => {
		setIsPickerVisible(false);
		setSelectedDate(date);

		const formattedDate = new Date(date).toLocaleDateString();
		setSelectedDate(formattedDate); // update state with selected date

		alert('Selected Date: ' + formattedDate);
		console.log('Selected Date: ' + formattedDate);
		
		navigation.navigate('LeaguesScreen', { selectedDate: formattedDate });

	};


	const handleSearch = (term) => {
		setSearchTerm(term);
		console.log('Searching for: ' + term);
	};

	return (
		<Stack.Navigator 
			initialRouteName='LeaguesScreen'
			screenOptions={ScreenOptions(isPickerVisible, setIsPickerVisible, 
                isSearchBarVisible, setIsSearchBarVisible, onDateSelected)}
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
	const [selectedDate, setSelectedDate] = useState(null);
	// const [searchTerm, setSearchTerm] = useState('');
	const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

	const onDateSelected = (date) => {
		setIsPickerVisible(false);
		setSelectedDate(date);

		const formattedDate = new Date(date).toLocaleDateString();
		setSelectedDate(formattedDate); // update state with selected date

		alert('Selected Date: ' + formattedDate);
		console.log('Selected Date: ' + formattedDate);

		navigation.navigate('HomeScreen', { selectedDate: formattedDate });

	};

	const handleSearch = (term) => {
		setSearchTerm(term);
		console.log('Searching for: ' + term);
	};

	return (
		<Stack.Navigator 
			initialRouteName='HomeScreen'
			screenOptions={ScreenOptions(isPickerVisible, setIsPickerVisible, 
                isSearchBarVisible, setIsSearchBarVisible, onDateSelected)}
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
				// initialParams={{ selectedDate: selectedDate }}
				options={{
					headerTitle: () => (
						isSearchBarVisible
							? <SearchBar onSearch={(term) => console.log(term)} />
							: <Text style={styles.headerText}>Home</Text>
					),	
				}}
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
            <Stack.Screen
				name='RaceScreen'
				component={RaceScreen}
				initialParams={{newTitle: 'Race Screen'}}
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