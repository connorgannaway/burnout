/*
    tab.js
    Caleb Kornegay
    10/27/2023
    Provides a tab navigator so that stacks can be nested and separate
    Allows us to render different screens outside of each other.
*/
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import TestScreen from '../screens/testscreen';
import { HomeStack, LeagueStack } from './stack';


const Tab = createBottomTabNavigator();

export default function MyTab(){
	return (
		<SafeAreaProvider>
			<NavigationContainer Tab>
				<Tab.Navigator initialRouteName='HomeStack'
                    screenOptions={{
                        tabBarActiveTintColor: '#f00',
                        tabBarInactiveTintColor: '#000',
                        headerShown: false,
                    }}
                >
					<Tab.Screen
						name='HomeStack'
						component={HomeStack}
						options={{
							title: 'Home',
							tabBarIcon: ({focused, size}) => (
                                focused ? <MaterialCommunityIcons 
                                name='home'
                                size={size} 
                                color={'#f00'}
                                /> : <MaterialCommunityIcons 
                                name='home'
                                size={size} 
                                color={'#000'}
                                />
								
							),
						}}></Tab.Screen>
					<Tab.Screen
						name='LeaguesStack'
						component={LeagueStack}
						options={{
							title: 'Leagues',
							tabBarIcon: ({ focused, size }) => (
								focused ? <MaterialCommunityIcons 
                                name='racing-helmet'
                                size={size} 
                                color={'#f00'}
                                /> : <MaterialCommunityIcons 
                                name='racing-helmet'
                                size={size} 
                                color={'#000'}
                                />
							),
						}}></Tab.Screen>
					<Tab.Screen
						name='Test'
						component={TestScreen}
						options={{
							title: 'Test',
							tabBarIcon: ({ focused, size }) => (
								focused ? <MaterialCommunityIcons 
                                name='calendar-today'
                                size={size} 
                                color={'#f00'}
                                /> : <MaterialCommunityIcons 
                                name='calendar-today'
                                size={size} 
                                color={'#000'}
                                />
							)
						}}></Tab.Screen>
				</Tab.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}