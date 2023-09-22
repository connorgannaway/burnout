import React, { useState, useEffect } from 'react';
import { Animated, Button, StyleSheet, Text, View, Easing } from 'react-native';

export default function App() {
    const [showText, setShowText] = useState(false);
    const spinValue = new Animated.Value(0);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    useEffect(() => {
        if (showText) {
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(() => {
                spinValue.setValue(0); // Reset the animation
            });
        }
    }, [showText]);

    const handlePress = () => {
        spinValue.setValue(0); // Reset the animation value
        setShowText(false); // Reset the showText state

        // Wait for a moment before showing the text again
        setTimeout(() => {
            setShowText(true);
        }, 50);
    };

    return (
        <View style={styles.container}>
            {showText && (
                <Animated.Text style={{ fontSize: 80, fontWeight: 'bold', transform: [{ rotate: spin }] }}>
                    Hello World!
                </Animated.Text>
            )}
            <Button title="Press Me" onPress={handlePress} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});