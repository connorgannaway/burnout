import { BASEURL, V1TEAMSJSON } from './urls';
import BaseCard from '../components/card';
import {Text, View} from 'react-native';

export default async function getteams(){
	return await getdata();
}

async function getdata(){
	return await fetch(V1TEAMSJSON+'&year=2022')
		.catch(error => {
			console.warn(error);
		}).then(response => {
			return response.json();
		}).catch(error => {
			console.warn(error);
		}).then(json => {
			return JSON.parse(JSON.stringify(json));
		}).catch(error => {
			console.warn(error);
		}).then(data => {
			// return (<BaseCard 
			//     where={'TeamMasterScreen'}
			//     title={data['team']}
			//     name={data['team']}
			//     // subName={data['track']}
			//     body={'Points: '+data['points']}
			//     bgcolor={'#ff0000'}
			//     key={data['team']+data['points']}
			//     message={'This is a team'}
			//     />
			//     );
			return (<View><Text>{data.map(item =>
				<Text>{item.team}      points: {item.points}{'\n'}</Text>)} </Text></View>);
		}).catch(error => {
			console.warn(error);
		});
}