import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';


export default function App() {


  const [isShowingImage, setShowingImage] = React.useState(false)

  // function ShowImage() {
  //     <View style={styles.container}>
        
  //     </View>
  // }

  // function HideImage() {
    
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.bigFont}>Hello World!</Text>
      <Button
        // onPress={onPressLearnMore}
        onPress={() => Alert.alert('HELLO PLUS!!!')}
        title="Hello Plus"
        color="#00ffff"
        // accessibilityLabel="Learn more about this purple button"
      />
      {
        isShowingImage ?
        (
         <Image
           source={{
           uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/320px-The_Blue_Marble_%28remastered%29.jpg',
           method: 'POST',
           headers: {
             Pragma: 'no-cache',
           },
            body: 'TEST TEST TEST TESTYour Body goes here', 
           }}
           style={{width: 400, height: 400}}
          />
         ) : (
      <Button
        title="View Image"
        color="#ff0000"
        onPress={() => setShowingImage(true)}
      /> )
         }
      <Button
          title="Close Image"
          color="#ff0000"
          onPress={() => setShowingImage(false)}
      />    
      <StatusBar style="auto" />
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
  bigFont: {
    fontSize: 30,
  },
});

{/* if(isShowingImage) {
        <View style={styles.container}>
        <Button
          title="Close Image"
          color="#ff0000"
          onPress={() => setShowingImage(false)}
        />
        <Image
          source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/320px-The_Blue_Marble_%28remastered%29.jpg',
          method: 'POST',
          headers: {
          Pragma: 'no-cache',
         },
          body: 'TEST',
         }}
         style={{width: 400, height: 400}}
        />
        </View>
      } else {
        <View style={styles.container}>
        <Button
          title="View Image"
          color="#ff0000"
          onPress={() => setShowingImage(true)}
        />
       </View>
      } */}
      