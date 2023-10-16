import BaseCard from '../components/card';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import getmessages from '../api/messages';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'left',
	},
});
async function get(){
    const l = await getmessages();
    return await l;
}
const messages = get();

function render(cards){
    if(cards != null){
        return (
            <View>
                {cards}
            </View>
        );
    }
    return null;
}

export default function HomeScreen({ navigation }) {
    const cards = messages["_j"];     
    console.log(cards);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff', textAlign: 'left', }}>
			<View style={styles.container}>
				{/* Put things that should be rendered into the ScrolLView element */}
				<ScrollView>
                    {render(cards)}
					<Text>Body Text</Text>
					{Array.from({ length: 50 }).map((_, i) => (
						<Text key={i}>
                        Render stuff here {i + 1}
						</Text>
					))}
					<BaseCard 
						navigation={navigation}
						name={'Formula 1'}
						body={'Click to view the Formula 1 League Page'}
						bgcolor={'#ff00ff'}
						where={'LeaguesScreen'}
					/>
				</ScrollView>
				<StatusBar style="auto" />
			</View>
		</SafeAreaView>
	);
}

// function buildcards(data){
//         data.then(fetched => {
//             return fetched.json()
//         }).catch(error => {
//             console.warn(error);
//         }).then(messages => {
//             return JSON.parse(JSON.stringify(messages))
//         }).catch(error => {
//             console.warn(error);
//         }).then(data => {
//             for(i = 0; i < Object.keys(data).length; i++){
//                     <BaseCard navigation={null}
//                     where={null}
//                     name={data[i]['title']}
//                     subName={'This is message #'+data[i]['pk']}
//                     body={data[i]['message']}
//                     bgcolor={'#ff00ff'}/>
//             }
//         }).catch(error => {
//             console.warn(error);
//         })
// }