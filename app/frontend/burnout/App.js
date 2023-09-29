// import React from "react";
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LeaguesScreen from "./screens/LeaguesScreen";
import TestScreen from "./screens/TestScreen";

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

export default function App() {
return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Leagues">
      <Stack.Screen 
        name="LeaguesScreen" 
        component={LeaguesScreen} 
        options={{ title: 'Leagues Overview' }}
      />
      <Stack.Screen 
        name="TestScreen" 
        component={TestScreen} 
        options={{ title: 'Test' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
};