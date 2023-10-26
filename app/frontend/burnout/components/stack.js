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
import { Button, StyleSheet, View, TouchableOpacity, MaterialIcons, SafeAreaView, Image, Modal } from 'react-native';
import Topbar from './topbar';
import DateRangePicker from './DateRangePicker';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
	iconContainer: {
		flexDirection: 'row',
		width: 60,
		justifyContent: 'space-between',
	},
});

const ScreenOptions = ( isPickerVisible, setIsPickerVisible, onRangeSelected ) => ({
	headerBackTitleVisible: false,
	headerTitleAlign: 'center',
	headerTintColor: '#fff',
	headerStyle: {
		backgroundColor: '#ff0000',
	},
	headerRight: () => (
		<SafeAreaView>
			<View style={{flexDirection:'row'}}>
				<MaterialCommunityIcons 
					name='magnify' 
					color={'black'} 
					size={25} 
					style={{paddingLeft: 20}}
					onPress={() => 
					{alert('This has not been implemented yet');}}/>
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

function LeagueStack({navigation}){
	const [isPickerVisible, setIsPickerVisible] = useState(false);

	const onRangeSelected = (startDate, endDate) => {
		setIsPickerVisible(false);

		const formattedStartDate = startDate.toLocaleDateString();
		const formattedEndDate = endDate.toLocaleDateString();

		alert('Start Date: ' + formattedStartDate + '\nEnd Date: ' + formattedEndDate);
		console.log('Start Date: ' + formattedStartDate + '\nEnd Date: ' + formattedEndDate);
	};

	return (
		<Stack.Navigator 
			initialRouteName='LeaguesScreen'
			screenOptions={ScreenOptions(isPickerVisible, setIsPickerVisible, onRangeSelected)}
		> 
			<Stack.Screen
				name='LeaguesScreen'
				component={LeaguesScreen}
				options={{
					title: 'Leagues Page'
				}}
			></Stack.Screen>
			<Stack.Screen
				name='TestScreen'
				component={TestScreen}
				initialParams={{newTitle: 'Testing Page'}}
				options={
					({ route }) => ({ title: route.params.newTitle })
				}
			></Stack.Screen>
			<Stack.Screen
				name='LeagueMasterScreen'
				component={LeagueMasterScreen}
				initialParams={{newTitle: 'League Master Screen'}}
				options={
					({ route }) => ({ title: route.params.newTitle })
				}
			></Stack.Screen>
			<Stack.Screen
				name='TeamMasterScreen'
				component={TeamMasterScreen}
				initialParams={{newTitle: 'Team Master Screen'}}
				options={
					({ route }) => ({ title: route.params.newTitle })
				}
			></Stack.Screen>
			<Stack.Screen
				name='DriverMasterScreen'
				component={DriverMasterScreen}
				initialParams={{newTitle: 'Driver Master Screen'}}
				options={
					({ route }) => ({ title: route.params.newTitle })
				}
			></Stack.Screen>
			<Stack.Screen
				name='RaceScreen'
				component={RaceScreen}
				options={{
					title: 'RaceScreen',
				}}
			>
			</Stack.Screen>
		</Stack.Navigator>
	);
}

export {LeagueStack};

function HomeStack({navigation}){
	const [isPickerVisible, setIsPickerVisible] = useState(false);
	const onRangeSelected = (startDate, endDate) => {
		setIsPickerVisible(false);

		const formattedStartDate = startDate.toLocaleDateString();
		const formattedEndDate = endDate.toLocaleDateString();

		alert('Start Date: ' + formattedStartDate + '\nEnd Date: ' + formattedEndDate);
		console.log('Start Date: ' + formattedStartDate + ' End Date: ' + formattedEndDate);
	};

	return (
		<Stack.Navigator 
			initialRouteName='HomeScreen'
			screenOptions={ScreenOptions(isPickerVisible, setIsPickerVisible, onRangeSelected)}
		>
			<Stack.Screen
				name='TestScreen'
				component={TestScreen}
				initialParams={{newTitle: 'Testing Page'}}
				options={
					({ route }) => ({ title: route.params.newTitle })
				}
			></Stack.Screen>
			<Stack.Screen
				name='LeaguesScreen'
				component={LeaguesScreen}
				options={{
					title: 'Leagues Page',
				}}
			></Stack.Screen>
			<Stack.Screen
				name='HomeScreen'
				component={HomeScreen}
				options={{
					title: 'Home Page',
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
					({ route }) => ({ title: route.params.newTitle })
				}
			>
			</Stack.Screen>
			<Stack.Screen
				name='TeamMasterScreen'
				component={TeamMasterScreen}
				initialParams={{newTitle: 'Team Master Screen'}}
				options={
					({ route }) => ({ title: route.params.newTitle })
				}
			>
			</Stack.Screen>
			<Stack.Screen
				name='DriverMasterScreen'
				component={DriverMasterScreen}
				initialParams={{newTitle: 'Driver Master Screen'}}
				options={
					({ route }) => ({ title: route.params.newTitle })
				}
			></Stack.Screen>
		</Stack.Navigator>
	);
}

export {HomeStack};