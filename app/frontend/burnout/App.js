import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BaseCard from './components/card';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the burnout app</Text>
      <StatusBar style="auto" />
      <BaseCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'top',
  },
});
