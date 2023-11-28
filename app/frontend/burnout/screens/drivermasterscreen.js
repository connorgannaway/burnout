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
import getdriverdetails from '../api/driverdetails';

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
		height: screen.height-250,
		width: screen.width,
		backgroundColor: '#d0d0d0',
		alignItems: 'center',
	},
});

export default class DriverMasterScreen extends React.Component{
	constructor({navigation, route}){
		const id = route.params?.id;
		super();
		this.state = {
			isLoading: true,
			driverdetails: getdriverdetails(id, {navigation}),
		};

			this.state.driverdetails
			.catch(error => {
				console.warn(error);
			}).then(() => {
				this.setState({isLoading: false});
			}).catch(error => {
				console.warn(error);
			});
	}

	put(cards){
		if(cards == null) return null;
        else return <View>{cards}</View>;
	}

	shouldComponentUpdate(nextState){
		if(this.state.driverdetails !== nextState.driverdetails) return true;
		if(nextState.isLoading === false) return true;
		return false;
	}

	render() {
		const { navigation } = this.props;
		/*TODO: swap test data with an API call to retrieve real data*/
		const races = [{name: 'Race 1', subName: 'Location 1', 
                        body: 'Race Data', bgcolor: '#ff1801', where: 'TestScreen'},
					{name: 'Race 2', subName: 'Location 2', 
                        body: 'Race Data', bgcolor: '#ff1801', where: 'TestScreen'},
					{name: 'Race 3', subName: 'Location 3', 
                        body: 'Race Data', bgcolor: '#ff1801', where: 'TestScreen'}];

		const raceCards = buildCardsFromData(navigation, races);

		return(
			<SafeAreaView style={styles.container}>
				<ScrollView>
					{this.put(this.state.driverdetails['_j'])}
					{/* {driverCards} */}
					{/* <BaseCard
						name={'Max Verstappen'}
						subName={'Total Driver Points: All of em'}
						body={'Current Driver Standing: First'}
						bgcolor={'#ff1801'}
						where={null}
						navigation={null}
					/> */}
				</ScrollView>
			</SafeAreaView>
		);
	}
}
