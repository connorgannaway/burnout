/*
    teammasterscreen.js
    Aaron King
    10/27/2023
    This screen will show the data for each individual team.
*/
import * as React from 'react';
import { View, ScrollView, Dimensions, StyleSheet, Text, SafeAreaView } from 'react-native';
import BaseCard, { buildCardsFromData } from '../components/card';
import getteams from '../api/teams';
import getteamdetails from '../api/teamdetails';

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

/*
 * TeamMasterScreen component builds a screen that displays information about the league
 *		props:
 *			navigation: navigation prop created by React Navigation
 *  
 */
export default class TeamMasterScreen extends React.Component{
	

	constructor({navigation, route}){
		const id = route.params?.id;
		super();
		this.state = {
			isLoading: true,
			teams: getteams(),
			teamdetails: getteamdetails(id, {navigation}),
		};

		this.state.teams
			.catch(error => {
				console.warn(error);
			}).then(() => {
				this.setState({isLoading: false});
			}).catch(error => {
				console.warn(error);
			});

			this.state.teamdetails
			.catch(error => {
				console.warn(error);
			}).then(() => {
				this.setState({isLoading: false});
			}).catch(error => {
				console.warn(error);
			});
	}

	put(cards){
		if(cards != null){
			if(this.state.isLoading){
				const c = [];
				for(let i = 0; i < cards.length/2; i++){
					c.push(cards[i]);
				}
				return(
					<View>
						{c}
					</View>
				);
			} else return <View>{cards}</View>;
		}
		return null;
	}

	shouldComponentUpdate(nextState){
		if(this.state.teams !== nextState.teams) return true;
		if(this.state.teamdetails !== nextState.teamdetails) return true;
		if(nextState.isLoading === false) return true;
		return false;
	}

	render() {
		const {navigation} = this.props;
        
		/*TODO: swap test data with an API call to retrieve real data*/

		return(
			<SafeAreaView style={styles.container}>
				<ScrollView>
					{/* {this.put(this.state.teams['_j'])} */}
					{this.put(this.state.teamdetails['_j'])}
					{/* <BaseCard
						name={'Team Name'}
						subName={'Total Team Points: 9'}
						body={'Current Team Standing: First'}
						bgcolor={'#ff1801'}
						where={null}
						navigation={null}
					/> */}
					{/* {Array.from({ length: 2 }).map((_,i) => (
						<BaseCard key={i}
							name={'Driver ' + (i + 1) + ' Name'}
							subName={'Current Driver Standing: last'}
							body={'Click to view data on driver ' + (i + 1)}
							bgcolor={'#ff1801'}
							where={'DriverMasterScreen'}
							navigation={navigation}
							title={'Driver ' + (i + 1)}
						/>
					))} */}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

