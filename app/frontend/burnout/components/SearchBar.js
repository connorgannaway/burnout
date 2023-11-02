import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      width: '70%',
      marginBottom: 10
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 10,
      paddingRight: 20,
      borderColor: '#ddd'
    }
  });

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleInputChange = (newTerm) => {
    setTerm(newTerm);
  };

  const handleSubmitEditing = () => {
    onSearch(term);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={term}
        onChangeText={handleInputChange}
        placeholder="Search..."
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  );
};

export default SearchBar;