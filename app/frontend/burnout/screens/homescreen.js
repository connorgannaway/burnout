import BaseCard from '../components/card';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform } from 'react-native';
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

// const messages = getmessages();
// const briefs = getbriefs().then(data => {
// 	console.log(data);
// });

// function render(cards){
// 	if(cards != null){
// 		return (
// 			<View>
// 				{cards}
// 			</View>
// 		);
// 	}
// 	return null;
// }

export default class HomeScreen extends React.Component{
	constructor(){
		super();
		this.state = {
			isLoading: true,
			messages: getmessages(),
			briefs: getbriefs(),
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
		// if(cards != null){
		//     if(this.state.isLoading){
		//         let c = [];
		//         for(let i = 0; i < cards.length/2; i++){
		//             c.push(cards[i]);
		//         }
		//         return(
		//             <View>
		//                 {c}
		//             </View>
		//         );
		//     } else return <View>{cards}</View>
		// }
		// return null;
		if(cards == null) return null;
		return <View>{cards}</View>;
	}

	shouldComponentUpdate(nextState){
		if(this.state.briefs !== nextState.briefs) return true;
		if(this.state.messages !== nextState.messages) return true;
		if(nextState.isLoading === false) return true;
		return false;
	}

	render(){
		const {navigation} = this.props;
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff', textAlign: 'left', }}>
				<View style={styles.container}>
					{/* Put things that should be rendered into the ScrolLView element */}
					<ScrollView>
						{this.put(this.state.messages['_j'])}
						{this.put(this.state.briefs['_j'])}
						<Text>Body Text</Text>
						{Array.from({ length: 50 }).map((_, i) => (
							<Text key={i}>
                            Render stuff here {i + 1}
							</Text>
						))}
						<BaseCard 
							navigation={navigation}
							name={'Leagues Page'}
							body={'Click to view the Leagues Page'}
							bgcolor={'#ff00ff'}
							where={'LeaguesScreen'}
						/>
					</ScrollView>
					<StatusBar style="auto" />
				</View>
			</SafeAreaView>
		);
	}
}

// export default function HomeScreen({ navigation }){
//     return(
//         <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', textAlign: 'left', }}>
//         <View style={styles.container}>
//             {/* Put things that should be rendered into the ScrolLView element */}
//             <ScrollView>
//                 {render(messages['_j'])}
//                 {render(briefs['_j'])}
//                 <Text>Body Text</Text>
//                 {Array.from({ length: 50 }).map((_, i) => (
//                     <Text key={i}>
//                     Render stuff here {i + 1}
//                     </Text>
//                 ))}
//                 <BaseCard 
//                     navigation={navigation}
//                     name={'Formula 1'}
//                     body={'Click to view the Formula 1 League Page'}
//                     bgcolor={'#ff00ff'}
//                     where={'LeaguesScreen'}
//                 />
//             </ScrollView>
//             <StatusBar style="auto" />
//         </View>
//     </SafeAreaView>
//     );
// }
