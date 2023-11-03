/*
    leaguemasterscreen.js
    Andrew Lindstrom
    idk who else
    10/27/2023
    comment here pls
*/
import * as React from 'react';
import { View, ScrollView, Dimensions, StyleSheet, Text } from 'react-native';
import BaseCard, { buildCardsFromData } from '../components/card';
import { Table, ScrollTable, TableManager } from '../components/table';
import BottomBar from '../components/bottombar';
import Topbar from '../components/topbar';

import { Table, TableManager } from '../components/table';
import StandingsCard, { standingsCard } from '../components/standingscard';

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
	container:{
		flex: 1,
		height: screen.height-250,
		width: screen.width,
		backgroundColor: '#efefef',
		alignItems: 'center',
	},
});

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
		const { navigation } = this.props;
		const DATA = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4];
		/*TODO: swap test data with an API call to retrieve real data*/
		
		const raceRecap = [{name: 'Last Race', body:'1. Max Verstappen\n\
                            2. Lightning McQueen\n3. Spider-Man', bgcolor: '#ff1801', where:'RaceScreen'}];
		const raceRecapCard = buildCardsFromData(navigation, raceRecap);

		const schedule = [{name: 'Schedule', body:'10/8     Next Race\n\
                            10/15   Nexter Race\n10/22   Nextest Race', bgcolor: '#ff1801', where:'TestScreen'}];
		const scheduleCard = buildCardsFromData(navigation, schedule);
		
		const standingsData = [
			{ position: 1, name: 'Driver 1', team: 'Team A', points: 100 },
			{ position: 2, name: 'Driver 2', team: 'Team B', points: 90 },
			{ position: 3, name: 'Driver 3', team: 'Team C', points: 80 },
			{ position: 4, name: 'Driver 4', team: 'Team D', points: 75 },
			{ position: 5, name: 'Driver 5', team: 'Team E', points: 70 },
			// Add data for all teams
		];

		// const teams = [{name: 'Teams', body: 'Click to view individual team page',
        //                     bgcolor: '#ff1801', where: 'TeamMasterScreen'}];
		// const teamscard = buildCardsFromData(navigation, teams);

		return(
			<View style={styles.container}>
				<ScrollView>
					<TableManager headings = {["first", "second","third","fourth"]}>
						<ScrollTable
							key={0}
							data={DATA}
							numColumns={1}
							navigation={navigation}
						/>
						<Table
							key={1}
							data={DATA}
							numColumns={2}
							navigation={navigation}
						/>
						<Table
							key={2}
							data={DATA}
							numColumns={3}
							navigation={navigation}
						/>
						<Table
							key={3}
							data={DATA}
							numColumns={4}
							navigation={navigation}
						/>
					</TableManager>
					<BaseCard 
						navigation={navigation}
						name={'Formula 1'}
						body={'Click to view the Formula 1 League Page'}
						bgcolor={'#ff1801'}
						where={'LeagueMasterScreen'}
					/>
					<BaseCard 
						navigation={navigation} 
						name={'NASCAR'}
						body={'Click to view the NASCAR League Page'}
						bgcolor={'#e4002b'}
						where={'LeagueMasterScreen'}
					/>
					<BaseCard 
						navigation={navigation} 
						name={'MotoGP'}
						body={'Click to view the MotoGP League Page'}
						bgcolor={'#E0144C'}
						where={'LeagueMasterScreen'}
					/>
					<BaseCard 
						navigation={navigation} 
						name={'IndyCar'}
						body={'Click to view the IndyCar League Page'}
						bgcolor={'#b92a30'}
						where={'LeagueMasterScreen'}
					/>
				</ScrollView>
				<TableManager headings = {['first', 'second','third']}>
					<Table
						key={1}
						data={DATA}
						numColumns={2}
						navigation={navigation}
					/>
					<Table
						key={2}
						data={DATA}
						numColumns={3}
						navigation={navigation}
					/>
					<Table
						key={3}
						data={DATA}
						numColumns={4}
						navigation={navigation}
					/>
				</TableManager>
				<ScrollView>
					{raceRecapCard}
					{scheduleCard}
					{standingsCard}
					<StandingsCard data={standingsData} />
					<BaseCard
						name={'Team Name'}
						subName={'Total Team Points: 9'}
						body={'Current Team Standing: First'}
						bgcolor={'#ff1801'}
						where={'TeamMasterScreen'}
						navigation={navigation}
						title={'Team Name'}
						id={9}
					/>
					<StandingsCard data={standingsData} />
				</ScrollView>
			</View>
		);
	}
}
