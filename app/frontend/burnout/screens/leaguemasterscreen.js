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
import { Table, TableManager } from '../components/table';
import StandingsCard, { standingsCard } from '../components/standingscard';
import { getLeagues } from "../api/leagues";
import { getConstructorDetails, getDriverDetails } from "../api/leaguedetails";


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
 */
export default class LeagueMasterScreen extends React.Component{
	constructor(){
		super();
		this.state = {
			isLoadingConstructors: true,
			isLoadingDrivers: true,
			constructorDetails: getConstructorDetails(),
			driverDetails: getDriverDetails(),
		};

		this.state.constructorDetails
			.catch(error => {
				console.warn(error);
			}).then(() => {
				this.setState({isLoadingConstructors: false});
			}).catch(error => {
				console.warn(error);
			});

		this.state.driverDetails
			.catch(error => {
				console.warn(error);
			}).then(() => {
				this.setState({isLoadingDrivers: false});
			}).catch(error => {
				console.warn(error);
			});
	}

	shouldComponentUpdate(nextState){
		if(this.state.constructorDetails != nextState.constructorDetails) return true;
		if(this.state.driverDetails != nextState.driverDetails) return true;
		if(nextState.isLoadingDrivers === false) return true;
		if(nextState.isLoadingConstructors === false) return true;

		return false;
	}

	put(data, loadCheck){
		console.log(data);

		if(data != null){
			if(loadCheck){
				const c = [];
				for(let i = 0; i < data.length/2; i++){
					c.push(data[i]);
				}
				return c;
			} else return data;
		}

		return [];
	}

	render() {
		const { navigation } = this.props;

		return(
			<View style={styles.container}>
				<ScrollView snapToAlignment='center'>
					<TableManager headings = {['Constructors', 'Drivers']}>
						<Table
							key={1}
							data={this.put(this.state.constructorDetails['_j'], this.isLoadingConstructors)}
							numColumns={4}
							navigation={navigation}
						/>
						<Table
							key={2}
							data={this.put(this.state.driverDetails['_j'], this.isLoadingDrivers)}
							numColumns={4}
							navigation={navigation}
						/>
					</TableManager>
				</ScrollView>
			</View>
		);
	}
}
