import * as React from 'react';
import { Card, Button } from 'react-native-paper';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		width: screen.width/1.15,
		padding: screen.width/24,
		marginTop: screen.height/96,
		marginBottom: screen.height/96,
		borderRadius: 15,
	},
	title:{
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		color: 'white',
	}
});

// function press({navigation, where, title}){
// 	navigation.setOptions({title: title});
// 	navigation.navigate({name: where});
// }

export default class BaseCard extends React.Component{
	constructor(){
		super();
		this.state = {
			showComponent: true,
		};
		this.GoHere = this.GoHere.bind(this);
	}
	render () {
		const {navigation, name, subName, body, bgcolor, where, message, title } = this.props;
		const screenName = where;

		return (
			<View style={styles.cardStyle}>
				<Card 
					style={[styles.container, {backgroundColor: bgcolor}]} 
					onPress={() => navigation != null ? navigation.navigate(JSON.stringify(where).substring(1, where.length+1), {newTitle: title}) : alert(message)}>

					<Card.Title  
						subtitleStyle={styles.title} 
						titleStyle={styles.title} 
						title={name} 
						subtitle={subName}>
					</Card.Title>
					<Card.Content style={styles.title}>
						<Text style={{color: 'white'}} variant="bodyMedium">{body}</Text>
					</Card.Content>
					{/* Currently this is not needed but keeping it in case
                    it is needed later */}
					{/* <Card.Actions justifyContent='center'>
                    <Button 
                        onPress={() => alert("You don't wanna do that")}>
                    Cancel</Button>
                    <Button 
                        onPress={() => console.log('I\'M PRESSED FRFR')}>
                    Ok</Button>
                    <Button 
                        onPress={this.GoHere}>
                    Kill react</Button>
                </Card.Actions> */}
				</Card>
			</View>
		);
	}


	GoHere () {
		const { showComponent } = this.state;
		this.setState({
			showComponent: !showComponent,
		});
	}

}

/*
 * Takes a navigation prop and list of data and turns them into a list of BaseCard components
 *      navigation: navigation prop created by React Navigation
 *            data: a list of objects containting the necessary data to fill out a BaseCard component
 */
export function buildCardsFromData(navigation, data){

	return data.map((data) => 
		<BaseCard 
			key={data.name + data.where} 
			navigation={navigation} 
			name={data.name} 
			subName={data.subName} 
			body={data.body} 
			bgcolor={data.bgcolor} 
			where={data.where}
		/>
	);
}

