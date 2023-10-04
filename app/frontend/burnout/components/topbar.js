import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

let uri = 'data:image/png;base64,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';

export default function Topbar() {
    return (
        <View style={styles.topBar}>
            <Image style={styles.logo} source={{ uri: uri }} />
            <Text style={styles.headerText}>Home Page</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <MaterialIcons name="search" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="calendar" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
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
