import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    borderColor: '#ddd'
  }
});

export default SearchBar;