import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';

import TestScreen from '../screens/testscreen';
import { HomeStack, LeagueStack } from './stack';

const Tab = createBottomTabNavigator();

export default function MyTab(){
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator initialRouteName='HomeStack'>
                    <Tab.Screen
                        name='HomeStack'
                        component={HomeStack}
                        options={{
                            title: 'Home',
                            headerShown: false,
                            tabBarIcon: ({size}) => (
                                <MaterialCommunityIcons name='home' color='#f0f' size={size}/>
                              ),
                            tabBarActiveTintColor: '#000',
                            tabBarInactiveTintColor: '#f0f'
                    }}></Tab.Screen>
                    <Tab.Screen
                        name='LeaguesStack'
                        component={LeagueStack}
                        options={{
                            title: 'Leagues',
                            headerShown: false,
                            tabBarIcon: ({ size }) => (
                                <MaterialCommunityIcons 
                                    name='racing-helmet' 
                                    color={'black'} 
                                    size={size} />
                              ),
                            tabBarActiveTintColor: '#000',
                            tabBarInactiveTintColor: '#f0f',
                    }}></Tab.Screen>
                    <Tab.Screen
                        name='Test'
                        component={TestScreen}
                        options={{
                            title: 'Test',
                            headerShown: false,
                            tabBarActiveTintColor: '#000',
                            tabBarInactiveTintColor: '#f0f',
                            tabBarIcon: ({ size }) => (
                                <MaterialCommunityIcons 
                                    name='calendar-today' 
                                    color={'black'} 
                                    size={size} />
                              )
                    }}></Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}