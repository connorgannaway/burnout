import * as React from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { buildCardsFromData } from '../components/card'
import BottomBar from '../components/bottombar';
import Topbar from '../components/topbar';


/*
 * LeagueMasterScreen component builds a screen that displays information about the league
 *		props:
 *			navigation: navigation prop created by React Navigation
 *
 */
export default class LeagueMasterScreen extends React.Component{
	constructor(){
		super()
		this.state = {
			showComponent: true,
		}
	}

	render() {
		const {navigation} = this.props;
		/*TODO: swap test data with an API call to retrieve real data*/
		
		const raceRecap = [{name: "Last Race", body:"1. Max Verstappen\n2. Lightning McQueen\n3. Spider-Man", bgcolor: '#ff1801', where:'TestScreen'}];
		const raceRecapCard = buildCardsFromData(navigation, raceRecap);

		const schedule = [{name: "Schedule", body:"10/8     Next Race\n10/15   Nexter Race\n10/22   Nextest Race", bgcolor: '#ff1801', where:'TestScreen'}];
		const scheduleCard = buildCardsFromData(navigation, schedule);

		const standings = [{name: "Standings", body:"1. Max Verstappen - All the points\n1. Driver 2 - X Points\n1. Driver 3 - X Points", bgcolor: '#ff1801', where:'TestScreen'}];
		const standingsCard = buildCardsFromData(navigation, standings);

		return(
			<View style={styles.container}>
				<ScrollView>
					{raceRecapCard}
					{scheduleCard}
					{standingsCard}
				</ScrollView>
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
		backgroundColor: "#efefef",
		alignItems: 'center',
	},
})