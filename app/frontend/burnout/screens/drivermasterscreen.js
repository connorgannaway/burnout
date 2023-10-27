/*
    drivermasterscreen.js
    idk who
    10/27/2023
    comment here pls
*/
import * as React from 'react';
import { View, ScrollView, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import BaseCard from '../components/card';
import { buildCardsFromData } from '../components/card';
import BottomBar from '../components/bottombar';
import Topbar from '../components/topbar';

export default class DriverMasterScreen extends React.Component{
	constructor(){
		super();
		this.state = {
			showComponent: true,
		};
	}

	render() {
		const {navigation} = this.props;
		/*TODO: swap test data with an API call to retrieve real data*/
		const races = [{name: 'Race 1', subName: 'Location 1', body: 'Race Data', bgcolor: '#ff1801', where: 'TestScreen'},
					   {name: 'Race 2', subName: 'Location 2', body: 'Race Data', bgcolor: '#ff1801', where: 'TestScreen'},
					   {name: 'Race 3', subName: 'Location 3', body: 'Race Data', bgcolor: '#ff1801', where: 'TestScreen'}];

		const raceCards = buildCardsFromData(navigation, races);

		return(
			<SafeAreaView style={styles.container}>
				<ScrollView>
					{/* {driverCards} */}
					<BaseCard
						name={'Max Verstappen'}
						subName={'Total Driver Points: All of em'}
						body={'Current Driver Standing: First'}
						bgcolor={'#ff1801'}
						where={null}
						navigation={null}
					/>
				</ScrollView>
			</SafeAreaView>
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