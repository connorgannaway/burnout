/*
    teams.js
    Aaron King
    10/27/2023
    Returns list of teams with their ID's and current season points.
*/
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
			return (<View><Text>{data.map(item =>
				<Text>{item.team}      points: {item.points}{'\n'}</Text>)} </Text></View>);
		}).catch(error => {
			console.warn(error);
		});
}