/*
    card.js
    Caleb Kornegay
    Andrew Lindstrom
    Aaron King
    10/27/2023
    Provides a base-class card to render data and navigate.
    The color being magenta is not a bug.
*/
import * as React from 'react';
import { Card } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


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
		color: 'black',
	}
});

export default class BaseCard extends React.Component{
	constructor(){
		super();
		this.state = {
			showComponent: true,
		};
		this.GoHere = this.GoHere.bind(this);
	}
	render () {
		const {navigation, name, subName, body, bgcolor, fgcolor, where, message, title, id, raceID} = this.props;

		return (
			<View style={styles.cardStyle}>
				<Card 
					style={[styles.container, {borderLeftColor: bgcolor, borderLeftWidth: 20, backgroundColor: '#ffffff'}]} 
					onPress={() => navigation != null ? 
                    navigation.navigate(JSON.stringify(where).substring(1, where.length+1), 
                    {newTitle: title, id: id, raceId: raceID}) : null}>

					<Card.Title  
						subtitleStyle={[styles.title, {color: fgcolor}]} 
						titleStyle={[styles.title, {color: fgcolor}]} 
						title={name} 
						subtitle={subName}
						>
					</Card.Title>
					<Card.Content style={styles.title}>
						<Text style={{color: fgcolor}} variant="bodyMedium">{body}</Text>
					</Card.Content>
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

