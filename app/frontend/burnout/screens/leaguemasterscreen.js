import * as React from 'react';
import { View, ScrollView, Dimensions, StyleSheet, Text } from 'react-native';
import BaseCard, { buildCardsFromData } from '../components/card';
import { Table, TableManager } from '../components/table';
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
		super();
		this.state = {
			showComponent: true,
		};
	}

	render() {
		const {navigation} = this.props;
		const DATA = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0];

		return(
			<View style={styles.container}>
				<TableManager headings = {["first", "second"]}>
					<Table
						key={0}
						data={DATA}
						numColumns={3}
						navigation={navigation}
					/>
					<Table
						key={1}
						data={DATA}
						numColumns={5}
						navigation={navigation}
					/>
				</TableManager>
			</View>
		);
	}
}

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