import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestScreen from '../screens/testscreen';
import LeaguesScreen from '../screens/leaguesscreen';
import HomeScreen from '../screens/homescreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LeagueMasterScreen from '../screens/leaguemasterscreen';
import DriverMasterScreen from '../screens/drivermasterscreen';
import TeamMasterScreen from '../screens/teammasterscreen';
import RaceScreen from '../screens/racescreen';
import { Button, StyleSheet, View, TouchableOpacity, MaterialIcons, SafeAreaView, Image } from 'react-native';
import Topbar from './topbar';

const Stack = createNativeStackNavigator();
const styles = StyleSheet.create({
	iconContainer: {
		flexDirection: 'row',
		width: 60,
		justifyContent: 'space-between',
	},
});

const ScreenOptions = {
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
					onPress={() => 
					{alert('This has not been implemented yet');}}/>
			</View>
		</SafeAreaView>
	),
};

function LeagueStack({navigation}){
	return (
		<Stack.Navigator 
			initialRouteName='LeaguesScreen'
			screenOptions={ScreenOptions}
		> 
			<Stack.Screen
				name='LeaguesScreen'
				component={LeaguesScreen}
				initialParams={{newTitle: 'Leagues Screen'}}
				options={
					({ route }) => ({ title: route.params.newTitle })
				}
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
				options={{
					title: 'League Master Screen',
				}}
			>
			</Stack.Screen>
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
	return (
		<Stack.Navigator 
			initialRouteName='HomeScreen'
			screenOptions={ScreenOptions}
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
				initialParams={{newTitle: 'Leagues Page'}}
				options={
					({ route }) => ({ title: route.params.newTitle })
				}
			></Stack.Screen>
			<Stack.Screen
				name='HomeScreen'
				component={HomeScreen}
				initialParams={{newTitle: 'Home Page'}}
				options={
					({ route }) => ({ title: route.params.newTitle })
				}
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