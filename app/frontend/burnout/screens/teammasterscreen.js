import * as React from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { buildCardsFromData } from '../components/card';
import BottomBar from '../components/bottombar';
import Topbar from '../components/topbar';


/*
 * TeamMasterScreen component builds a screen that displays information about the league
 *		props:
 *			navigation: navigation prop created by React Navigation
 *  
 */
export default class TeamMasterScreen extends React.Component{
	constructor(){
		super();
		this.state = {
			showComponent: true,
		};
	}

	render() {
		const {navigation} = this.props;
        
		/*TODO: swap test data with an API call to retrieve real data*/
		const drivers = [{name: 'Driver 1', subName: 'Constructor 1', body: 'Race Data', bgcolor: '#5f5f5f', where: 'drivermasterscreen'},
						 {name: 'Driver 2', subName: 'Constructor 2', body: 'Race Data', bgcolor: '#5f5f5f', where: 'drivermasterscreen'},
						 {name: 'Driver 3', subName: 'Constructor 3', body: 'Race Data', bgcolor: '#5f5f5f', where: 'drivermasterscreen'}];

		const driverCards = buildCardsFromData(navigation, drivers);

		return(
			<View style={styles.container}>
				<Topbar />
				<ScrollView>
					{driverCards}
				</ScrollView>
				<BottomBar navigation={navigation}/>
			</View>
		);
	}
}

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
		height: screen.height-250,
		width: screen.width,
		backgroundColor: '#efefef',
	},
});