import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App(){

  const [index, setIndex] = useState("world");
  const [string, setString] = useState("");

  const handleClick = (e) =>{

    setIndex(string);

  }

  const handleChange = (e) =>{
    setString(e.target.value);
  }

  return (
    <View style = {styles.container}>
      <Text style = {styles.strong}> Hello {index}! </Text>
      <TextInput onChange={handleChange} placeholder="whats your name?" style={styles.textbox}/>
      <button onClick={handleClick} style={styles.button}> Hello! </button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  strong:{
    fontFamily: "Montserrat",
    fontWeight: "900",
    fontSize: 20,
  },
  textbox:{
    border: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 15,
    backgroundColor: "#ddd",
    boxShadowColor: "#ddd",
    boxShadowRadius: 10,
  },
  button:{
    borderWidth: 5,
    borderColor: "#57f",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#57f",
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: "bold",
  }
});

