import * as React from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { buildCardsFromData } from '../components/card'
import BottomBar from '../components/bottombar';
import Topbar from '../components/topbar';

export default class DriverMasterScreen extends React.Component{
	constructor(){
		super()
		this.state = {
			showComponent: true,
		}
	}

	render() {
		const {navigation} = this.props;
		/*TODO: swap test data with an API call to retrieve real data*/
		const races = [{name: "Race 1", subName: "Location 1", body: "Race Data", bgcolor: "#5f5f5f", where: "HomeScreen"},
					   {name: "Race 2", subName: "Location 2", body: "Race Data", bgcolor: "#5f5f5f", where: "HomeScreen"},
					   {name: "Race 3", subName: "Location 3", body: "Race Data", bgcolor: "#5f5f5f", where: "HomeScreen"}];

		const raceCards = buildCardsFromData(navigation, races);

		return(
			<View style={styles.container}>
				<Topbar />
				<ScrollView>
					{raceCards}
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
		backgroundColor: "#efefef",
	},
})