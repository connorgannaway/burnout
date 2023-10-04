import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TestScreen from '../screens/testscreen';
import LeaguesScreen from '../screens/leaguesscreen';
import HomeScreen from '../screens/homescreen';
import LeagueMasterScreen from '../screens/leaguemasterscreen';
import DriverMasterScreen from '../screens/drivermasterscreen';

const Stack = createNativeStackNavigator();

export default function MyStack(){
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='HomeScreen'>
				<Stack.Screen
					name="TestScreen"
					component={TestScreen}
					options={{
						title: 'Testing Page'
					}}>
				</Stack.Screen>
				<Stack.Screen
					name="LeaguesScreen"
					component={LeaguesScreen}
					options={{
						title: 'Leagues Page'
					}}>
				</Stack.Screen>
				<Stack.Screen
					name='HomeScreen'
					component={HomeScreen}
				>
				</Stack.Screen>
				<Stack.Screen
					name="leaguemasterscreen"
					component={LeagueMasterScreen}
				/>
				<Stack.Screen
					name="drivermasterscreen"
					component={DriverMasterScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
