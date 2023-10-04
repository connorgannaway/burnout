import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BottomBar({navigation}) {
  const [selected, setSelected] = useState(0);
  const buttons = ["Home", "Leagues", "Race", "Stuff"];
  const pages = ["HomeScreen", "LeaguesScreen", "TestScreen", "TestScreen"];

  return (
    <View style={styles.container}>
      {buttons.map((label, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, selected === index && styles.selectedButton]}
          onPress={() => {setSelected(index); navigation.navigate(pages[index]);}}
        >
          <Text style={[styles.label, selected === index && styles.selectedLabel]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 0,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    height: 60  
  },
  button: {
    flex: 1,
    height: '100%',  
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#e6e6e6',
  },
  label: {
    fontSize: 16,
  },
  selectedLabel: {
    fontWeight: 'bold',
  },
});