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
		const DATA = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4];

		return(
			<View style={styles.container}>
				<ScrollView>
					<TableManager headings = {["first", "second","third","fourth"]}>
						<Table
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