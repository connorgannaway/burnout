import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestScreen from '../screens/testscreen';
import LeaguesScreen from '../screens/leaguesscreen';
import HomeScreen from '../screens/homescreen';

const Stack = createNativeStackNavigator();

function LeagueStack(){
	return (
        <Stack.Navigator initialRouteName='LeaguesScren'> 
            <Stack.Screen
                name='LeaguesScreen'
                component={LeaguesScreen}
                options={{
                    title: 'Leagues Page',
                    // headerShown: false
                }}
            ></Stack.Screen>
            <Stack.Screen
                name='TestScreen'
                component={TestScreen}
                options={{
                    title: 'Testing Page',
                    // headerShown: false
                }}
            >
            </Stack.Screen>
        </Stack.Navigator>
	);
}

export {LeagueStack}

function HomeStack(){
    return (
        <Stack.Navigator initialRouteName='HomeScreen'>
            <Stack.Screen
                name='TestScreen'
                component={TestScreen}
                options={{
                    title: 'Testing Page',
                    // headerShown: false
                }}
            ></Stack.Screen>
            <Stack.Screen
                name='LeaguesScreen'
                component={LeaguesScreen}
                options={{
                    title: 'Leagues Page',
                    // headerShown: false
                }}
            ></Stack.Screen>
            <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                    title: 'Home Page',
                    // headerShown: false
                }}
            ></Stack.Screen>
        </Stack.Navigator>
    );
}

export {HomeStack}
