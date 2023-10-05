import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TestScreen from '../screens/testscreen';
import { HomeStack, LeagueStack } from './stack';

const Tab = createBottomTabNavigator();

export default function MyTab(){
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='HomeStack'>
                    <Tab.Screen
                        name='HomeStack'
                        component={HomeStack}
                        options={{
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
                            headerShown: false,
                            tabBarIcon: ({ size }) => (
                                <MaterialCommunityIcons name='racing-helmet' color={"black"} size={size} />
                              ),
                            tabBarActiveTintColor: '#000',
                            tabBarInactiveTintColor: '#f0f',
                    }}></Tab.Screen>
                    <Tab.Screen
                        name='Test'
                        component={TestScreen}
                        options={{
                            headerShown: false,
                            tabBarActiveTintColor: '#000',
                            tabBarInactiveTintColor: '#f0f'
                    }}></Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
    );
}