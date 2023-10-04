// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import BaseCard from './components/card';
// import LeaguesScreen from './screens/LeaguesScreen';
// import MyStack from './components/stack.js'
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import TestScreen from "./screens/TestScreen";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     //   <View style={styles.container}>
//     //   <Text>Welcome to the burnout app</Text>
//     //   <Text></Text>
//     //   <StatusBar style="auto" />
//     //   {/* <BaseCard /> */}
//     //   {/* <LeaguesScreen /> */}
//       <MyStack />
//     // </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlignVertical: 'top',
//   },
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Topbar from './Topbar';
import Bottombar from './Bottombar'


export default function App() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <Topbar />
                {/* Put things that should be rendered into the ScrolLView element */}
                <ScrollView style={styles.content}>
                    <Text>Body Text</Text>
                    {Array.from({ length: 50 }).map((_, i) => (
                        <Text key={i} style={styles.contentText}>
                            Render stuff here {i + 1}
                        </Text>
                    ))}
                </ScrollView>
                <StatusBar style="auto" />
                <Bottombar></Bottombar>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    topBar: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        width: 60,
        justifyContent: 'space-between',
    },
});
