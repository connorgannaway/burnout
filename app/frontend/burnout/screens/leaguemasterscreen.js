import * as React from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import BaseCard, { buildCardsFromData } from '../components/card';
import BottomBar from '../components/bottombar';
import Topbar from '../components/topbar';
import StandingsCard, { standingsCard } from '../components/standingscard';


/*
 * LeagueMasterScreen component builds a screen that displays information about the league
 *		props:
 *			navigation: navigation prop created by React Navigation
 *
 */
export default class LeagueMasterScreen extends React.Component{
	constructor(){
		super();
		this.state = {
			showComponent: true,
		};
	}

	render() {
		const {navigation} = this.props;
		/*TODO: swap test data with an API call to retrieve real data*/
		
		const raceRecap = [{name: 'Last Race', body:'1. Max Verstappen\n2. Lightning McQueen\n3. Spider-Man', bgcolor: '#ff1801', where:'RaceScreen'}];
		const raceRecapCard = buildCardsFromData(navigation, raceRecap);

		const schedule = [{name: 'Schedule', body:'10/8     Next Race\n10/15   Nexter Race\n10/22   Nextest Race', bgcolor: '#ff1801', where:'TestScreen'}];
		const scheduleCard = buildCardsFromData(navigation, schedule);
		
		const standingsData = [
			{ position: 1, name: 'Driver 1', team: 'Team A', points: 100 },
			{ position: 2, name: 'Driver 2', team: 'Team B', points: 90 },
			{ position: 3, name: 'Driver 3', team: 'Team C', points: 80 },
			{ position: 4, name: 'Driver 4', team: 'Team D', points: 75 },
			{ position: 5, name: 'Driver 5', team: 'Team E', points: 70 },
			// Add data for all teams
		  ];

		// const teams = [{name: 'Teams', body: 'Click to view individual team page', bgcolor: '#ff1801', where: 'TeamMasterScreen'}];
		// const teamscard = buildCardsFromData(navigation, teams);

		return(
			<View style={styles.container}>
				<ScrollView>
					{raceRecapCard}
					{scheduleCard}
					{standingsCard}
					<BaseCard
						name={'Team Name'}
						subName={'Total Team Points: 9'}
						body={'Current Team Standing: First'}
						bgcolor={'#ff1801'}
						where={'TeamMasterScreen'}
						navigation={navigation}
						title={'Team Name'}
					/>
					<StandingsCard data={standingsData} />
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
		backgroundColor: '#efefef',
		alignItems: 'center',
	},
});