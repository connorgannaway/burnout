import * as React from 'react';
import { View, ScrollView, Dimensions, StyleSheet, Text, SafeAreaView } from 'react-native';
import BaseCard, { buildCardsFromData } from '../components/card';
import DriverMasterScreen from './drivermasterscreen';

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
		// const drivers = [{name: 'Driver 1', subName: 'Constructor 1', body: 'Race Data', bgcolor: '#ff1801', where: 'DriverMasterScreen'},
		// 				 {name: 'Driver 2', subName: 'Constructor 2', body: 'Race Data', bgcolor: '#ff1801', where: 'DriverMasterScreen'},
		// 				 {name: 'Driver 3', subName: 'Constructor 3', body: 'Race Data', bgcolor: '#ff1801', where: 'DriverMasterScreen'}];

		// const driverCards = buildCardsFromData(navigation, drivers);

		return(
			<SafeAreaView style={styles.container}>
				<ScrollView>
					{/* {driverCards} */}
					<BaseCard
						name={'Team Name'}
						subName={'Total Team Points: 9'}
						body={'Current Team Standing: First'}
						bgcolor={'#ff1801'}
						where={null}
						navigation={null}
					/>
					{Array.from({ length: 2 }).map((_,i) => (
						<BaseCard key={i}
							name={'Driver ' + (i + 1) + ' Name'}
							subName={'Current Driver Standing: last'}
							body={'Click to view data on driver ' + (i + 1)}
							bgcolor={'#ff1801'}
							where={'DriverMasterScreen'}
							navigation={navigation}
							title={'Driver ' + (i + 1)}
						/>
					))}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

