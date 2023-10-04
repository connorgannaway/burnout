import * as React from 'react';
import { Card, Button } from 'react-native-paper';
import { StyleSheet, Text, View, Image, Dimensions, PixelRatio } from 'react-native';


export default class BaseCard extends React.Component{
    constructor(){
        super()
        this.state = {
            showComponent: true,
        };
        this.GoHere = this.GoHere.bind(this);
    }
    render () {
        const {navigation} = this.props;
        const {name} = this.props;
        if(this.state.showComponent) {
            return (
                <View>
                <Card style={styles.container} onPress={() => navigation.navigate('LeaguesScreen')}>
                    <Card.Title subtitleStyle={styles.title} titleStyle={styles.title} title={name} subtitle="I hate frontend"></Card.Title>
                    <Card.Content style={styles.title}>
                        <Text variant="bodyMedium">This is wild</Text>
                    </Card.Content>
                    <Card.Actions justifyContent='center'>
                        <Button onPress={() => alert("You don't wanna do that")}>Cancel</Button>
                        <Button onPress={() => console.log('I\'M PRESSED FRFR')}>Ok</Button>
                        <Button onPress={this.GoHere}>Kill react</Button>
                    </Card.Actions>
                </Card>
                </View>
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


    GoHere () {
        const { showComponent } = this.state;
        this.setState({
            showComponent: !showComponent,
        })
    }

}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: window.width/1.1,
        marginHorizontal: window.width/12,
        marginVertical: window.height/24,
        borderRadius: 15,
    },
    title:{
        backgroundColor: '#f0f',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
});
