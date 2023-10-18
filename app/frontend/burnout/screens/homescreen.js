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

const messages = getmessages();
const briefs = getbriefs();

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

// export default class HomeScreen extends React.Component{
//     constructor(){
//         super();
//         this.state = {
//             isLoading: true,
//             briefs: getbriefs(),
//             messages: getmessages(),
//         }
//     }
//     put() {
//         if(this.state.messages['_j'] != null && this.state.briefs != null){
//             this.setState({isLoading: false});
//             return (
//                 <View>
//                     {this.state.messages['_j']}
//                     {/* {this.state.briefs} */}
//                 </View>
//             );
//         }
//         return null;
//     }
//     render(){
//         const navigation = this.props;
//         console.log(this.state.messages);
//         if(this.state.isLoading){
//         return (
//             <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', textAlign: 'left', }}>
//                 <View style={styles.container}>
//                     {/* Put things that should be rendered into the ScrolLView element */}
//                     <ScrollView>
//                         {this.put()}
//                         <Text>Body Text</Text>
//                         {Array.from({ length: 50 }).map((_, i) => (
//                             <Text key={i}>
//                             Render stuff here {i + 1}
//                             </Text>
//                         ))}
//                         <BaseCard 
//                             navigation={navigation}
//                             name={'Formula 1'}
//                             body={'Click to view the Formula 1 League Page'}
//                             bgcolor={'#ff00ff'}
//                             where={'LeaguesScreen'}
//                         />
//                     </ScrollView>
//                     <StatusBar style="auto" />
//                 </View>
//             </SafeAreaView>
//         );
//     } else{
//         console.log('done loading: ', this.state.briefs);
//         return(
//             <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', textAlign: 'left', }}>
//             <View style={styles.container}>
//                 {/* Put things that should be rendered into the ScrolLView element */}
//                 <ScrollView>
//                     {this.put()}
//                     <Text>Body Text</Text>
//                     {Array.from({ length: 50 }).map((_, i) => (
//                         <Text key={i}>
//                         Render stuff here {i + 1}
//                         </Text>
//                     ))}
//                     <BaseCard 
//                         navigation={navigation}
//                         name={'Formula 1'}
//                         body={'Click to view the Formula 1 League Page'}
//                         bgcolor={'#ff00ff'}
//                         where={'LeaguesScreen'}
//                     />
//                 </ScrollView>
//                 <StatusBar style="auto" />
//             </View>
//         </SafeAreaView>
//     );
//     }}
// }

export default function HomeScreen({ navigation }){
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', textAlign: 'left', }}>
        <View style={styles.container}>
            {/* Put things that should be rendered into the ScrolLView element */}
            <ScrollView>
                {render(messages['_j'])}
                {render(briefs['_j'])}
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
