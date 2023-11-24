/*
    leaguesscreen.js
    idk who
    10/27/2023
    Create cards to be clickable to actually get to the specified league
*/
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { getLeagues } from '../api/leagues';
import BaseCard from '../components/card';

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#d0d0d0',
		alignItems: 'center',
		height: screen.height,
		width: screen.width,
	},
	scrollView: {
		backgroundColor: '#d0d0d0',
	},
});

export default function LeaguesScreen({ navigation }) {

	const [leagues, setLeagues] = React.useState();
	let leagueCards = null;

	React.useEffect( () => {
		let isLoadingLeagues = true;

		getLeagues().then(result => {
			if(isLoadingLeagues){
				setLeagues(result);
			}
		});

		return( () => {
			isLoadingLeagues = false;
		});

	}, []);

	leagueCards = leagues?.map((league, index) => {return(<BaseCard
										key = {league.name + index} 
										navigation={navigation}
										name={league.name}
										body={'Click to view the Formula 1 League Page'}
										bgcolor={'#ff1801'}
										where={'LeagueMasterScreen'}
										title={league.name}
										id = {league.disciplineId}
									/>);});

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView} >
				{/* This is where the cards for the leagues will go
            currently we have cards for Formula 1, NASCAR, 
            MotoGP and IndyCar */}
				{leagueCards}
				<BaseCard 
					navigation={navigation}
					name={'NASCAR'}
					body={'Click to view the NASCAR League Page'}
					bgcolor={'#e4002b'}
					where={'LeagueMasterScreen'}
					title={'NASCAR'}
					id = {'1'}

				/>
				<BaseCard 
					navigation={navigation} 
					name={'MotoGP'}
					body={'Click to view the MotoGP League Page'}
					bgcolor={'#E0144C'}
					where={'LeagueMasterScreen'}
					title={'MotoGP'}
					id = {'1'}

				/>
				<BaseCard 
					navigation={navigation} 
					name={'IndyCar'}
					body={'Click to view the IndyCar League Page'}
					bgcolor={'#b92a30'}
					where={'LeagueMasterScreen'}
					title={'IndyCar'}
					id = {'1'}

				/>
				<StatusBar style="auto" />
			</ScrollView>
		</SafeAreaView>
	);
}
