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
		backgroundColor: '#d0d0d0',
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'left',
	},
});

export default class HomeScreen extends React.Component{
	constructor({navigation}){
		super();
		this.state = {
			isLoading: true,
			messages: getmessages(),
			briefs: getbriefs(null, {navigation}),
			selectedDate: '', // hold selected date
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

	componentDidMount() {
		this.retrieveSelectedDate();
	}
	
	componentDidUpdate(prevProps) {
		if (prevProps.route.params?.selectedDate !== this.props.route.params?.selectedDate) {
			this.retrieveSelectedDate();
		}
	}
	
	retrieveSelectedDate = () => {
		const selectedDate = this.props.route.params?.selectedDate;
        const { navigation } = this.props;
		if (selectedDate) {
            const formattedDate = selectedDate.split('/')[2]
            + '-' + selectedDate.split('/')[0] + '-' + selectedDate.split('/')[1];
            getbriefs(formattedDate, {navigation})
            .catch(error => {
                console.warn(error);
            }).then(data => {
                this.setState({briefs: data});
            }).catch(error => {
                console.warn(error);
            });
            this.setState({ selectedDate });
		}
	};
	

	put(cards){
		if(cards == null) return null;
        if(cards['_j'] === undefined) return <View>{cards}</View>;
        else return <View>{cards['_j']}</View>;
	}

	shouldComponentUpdate(nextState){
		if(this.state.briefs !== nextState.briefs) return true;
		if(this.state.messages !== nextState.messages) return true;
		if(this.isLoading === nextState.isLoading) return false;
        if(this.selectedDate !== nextState.selectedDate) return true;
		return false;
	}

	render(){
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff', textAlign: 'left'}}>
				<View style={styles.container}>
					{/* Put things that should be rendered into the ScrolLView element */}
					<ScrollView>
						{this.put(this.state.messages)}
						{this.put(this.state.briefs)}
					</ScrollView>
					<StatusBar style="auto" />
				</View>
			</SafeAreaView>
		);
	}
}
