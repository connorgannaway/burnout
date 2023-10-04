import TopBar  from '../components/topbar';
import BottomBar  from '../components/bottombar';
import BaseCard from '../components/card';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
            <TopBar />
            {/* Put things that should be rendered into the ScrolLView element */}
            <ScrollView style={styles.content}>
                <Text>Body Text</Text>
                {Array.from({ length: 50 }).map((_, i) => (
                    <Text key={i} style={styles.contentText}>
                        Render stuff here {i + 1}
                    </Text>
                ))}
            <BaseCard navigation={navigation} />
            </ScrollView>
            <StatusBar style="auto" />
            <BottomBar navigation={navigation} />
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
