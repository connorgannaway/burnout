/*
    leaguemasterscreen.js
    Andrew Lindstrom
    idk who else
    10/27/2023
    comment here pls
*/
import * as React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { ScrollTable, TableManager } from '../components/table';
import { getConstructorDetails, getDriverDetails } from '../api/leaguedetails';

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
			numConstructorColumns: 1,
			numDriverColumns: 1,
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
		if(nextState.isLoadingConstructors === false && 
			nextState.isLoadingDrivers === false &&
			nextState.isLoadingRace === false) return true;

		return false;
	}

	put(data, loadCheck){
		if(data != null){
			if(loadCheck){
				const c = [];
				for(let i = 0; i < data.length/2; i++){
					c.push(data[i]);
				}
				return c;
			} else return data;
		}
		return [{id:0, data:['loading...']}];
	}

	render() {
		const { navigation } = this.props;
		
		return(
			<View style={styles.container}>
				<View style = {{flexDirection: 'column-reverse',
								height: 150,
								width: '100%',
								backgroundColor: '#f00',
								color: '#fff',
								shadowRadius: 1,
								shadowOffset: {height: 2, width: 0},
								shadowColor: 'black',
								shadowOpacity: .3,
								zIndex: 4,}}>
					<Text style = {{paddingBottom: 10,
									paddingHorizontal: 10,
									color: '#fff',
									fontWeight: '700',
									fontSize: 12,
									textTransform: 'capitalize',}}>
						3rd:
					</Text>
					<Text style = {{paddingTop: 5,
									paddingHorizontal: 10,
									color: '#fff',
									fontWeight: '700',
									fontSize: 12,
									textTransform: 'capitalize',}}>
						2nd:
					</Text>
					<Text style = {{paddingBottom: 2,
									paddingHorizontal: 10,
									backgroundColor: '#fff',
									color: '#f00',
									fontWeight: '900',
									fontSize: 15,
									textTransform: 'capitalize',}}>
						1st:
					</Text>
					<Text style = {{paddingHorizontal: 10,
									backgroundColor: '#fff',
									color: '#f00',
									fontWeight: '900',
									fontSize: 48,
									textTransform: 'uppercase'}}>
						Race
					</Text>
				</View>
				<View snapToAlignment='center'>
					<TableManager headings = {['Constructors', 'Drivers']}>
						<ScrollTable
							key={1}
							headings={['#', 'name', 'nationality', 'points']}
							data={this.put(this.state.constructorDetails['_j'],
											this.isLoadingConstructors).map((data) => data.data).flat()}
							id={this.put(this.state.constructorDetails['_j'],
											this.isLoadingConstructors).map((data) => data.id)}
							numColumns={4}
							navigation={navigation}
							where={'TeamMasterScreen'}
						/>
						<ScrollTable
							key={2}
							headings={['#', 'name', 'podiums', 'points']}
							data={this.put(this.state.driverDetails['_j'],
											this.isLoadingDrivers).map((data) => data.data).flat()}
							id={this.put(this.state.driverDetails['_j'],
											this.isLoadingDrivers).map((data) => data.id)}
							numColumns={4}
							navigation={navigation}
							where={'DriverMasterScreen'}
						/>
					</TableManager>
				</View>
			</View>
		);
	}
}
