/*
    homescreen.js
    Caleb Kornegay
    Aaron King
    10/27/2023
    The base home screen that pops up
    Bug -- race briefs are still messed up
*/
import BaseCard from '../components/card';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import getmessages from '../api/messages';
import getbriefs from '../api/briefs';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'left',
	},
});

export default class HomeScreen extends React.Component{
	constructor(){
		super();
		this.state = {
			isLoading: true,
			messages: getmessages(),
			briefs: getbriefs(),
            calendarbriefs: null,
		};

		this.state.briefs
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
        if(Object.values(cards[0])[4]['message'] == 'This is a race brief') {
            console.log('worked');
            const ret = [];
            for (let i = 0; i < Math.floor(cards.length/2); i++) {
                ret.push(cards[i]);
            }
            return <View>{ret}</View>
        }
		return <View>{cards}</View>;
	}

	shouldComponentUpdate(nextState){
		if(this.state.briefs !== nextState.briefs) return true;
		if(this.state.messages !== nextState.messages) return true;
		if(nextState.isLoading === false) return true;
		return false;
	}

	render(){
		const { navigation } = this.props;
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff', textAlign: 'left', }}>
				<View style={styles.container}>
					{/* Put things that should be rendered into the ScrolLView element */}
					<ScrollView>
						{this.put(this.state.messages['_j'])}
						{this.put(this.state.briefs['_j'])}
					</ScrollView>
					<StatusBar style="auto" />
				</View>
			</SafeAreaView>
		);
	}
}
