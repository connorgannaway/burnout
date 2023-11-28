import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import TestScreen from '../screens/testscreen';
import { HomeStack, LeagueStack } from './stack';

const Tab = createBottomTabNavigator();

export default function MyTab() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName='HomeStack'
                    screenOptions={{
                        tabBarActiveTintColor: '#f00',
                        tabBarInactiveTintColor: '#000',
                        headerShown: false,
                        tabBarLabelStyle: {
                            fontSize: 14,
                            fontWeight: 'bold',
                        },
                        tabBarStyle: {
                            paddingVertical: 5,
                        },
                    }}
                >
                    <Tab.Screen
                        name='HomeStack'
                        component={HomeStack}
                        options={{
                            title: 'Home',
                            tabBarIcon: ({ focused, size }) => (
                                <MaterialCommunityIcons
                                    name={'home'}
                                    size={size}
                                    color={focused ? '#f00' : '#000'}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name='LeaguesStack'
                        component={LeagueStack}
                        options={{
                            title: 'Leagues',
                            tabBarIcon: ({ focused, size }) => (
                                    <MaterialCommunityIcons
                                        name='racing-helmet'
                                        size={size}
                                        color={focused ? '#f00' : '#000'}
                                    />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name='Test'
                        component={TestScreen}
                        options={{
                            title: 'Settings',
                            tabBarIcon: ({ focused, size }) => (
                                <MaterialCommunityIcons
                                    name={'cog'}
                                    size={size}
                                    color={focused ? '#f00' : '#000'}
                                />
                            )
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
