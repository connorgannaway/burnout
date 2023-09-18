import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.Font}>Hello World!</Text>
      <StatusBar style="auto" />
      <Button
        onPress={() => Alert.alert('Test')}
        title="Useless Button"
        color="#ff0000"
        accessibilityLabel="Learn more about this purple button"
/>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Font: {
    fontSize: 30,
  }
});
