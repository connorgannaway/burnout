import React from 'react';
import { Card, Button } from 'react-native-paper';
import { StyleSheet, Text, View, Image } from 'react-native';
export default class BaseCard extends React.Component{
    constructor(){
        super()
        this.state = {
            showComponent: true,
        };
        this.GoHere = this.GoHere.bind(this);
    }
    render () {
        if(this.state.showComponent) {
            return (
                <Card style={styles.card_container} onPress={() => alert("You pressed the card")}>
                    <Card.Title subtitleStyle={styles.card_container} titleStyle={styles.card_container} title="This is the actual card" subtitle="I hate frontend"></Card.Title>
                    <Card.Content style={styles.card_container}>
                        <Text variant="bodyMedium">This is wild</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => alert("You don't wanna do that")}>Cancel</Button>
                        <Button onPress={() => console.log('I\'M PRESSED FRFR')}>Ok</Button>
                        <Button onPress={this.GoHere}>Kill react</Button>
                    </Card.Actions>
                </Card>
            );
        } else {
            alert("Check this sweet burnout ONG");
            return (
                <View>
                    <Text>You want the card back?</Text>
                    <Button onPress={this.GoHere}>Yes</Button>
                    <Button onPress={() => alert("You really don't want it back?")}>No</Button>
                    <Image source={require('../images/mustangburnout.jpg')}></Image>
                </View>
            );
        }
    }


    GoHere = () => {
        const { showComponent } = this.state;
        this.setState({
            showComponent: !showComponent,
        })
    }

}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
    card_container: {
    backgroundColor: '#f0f',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    }
});
