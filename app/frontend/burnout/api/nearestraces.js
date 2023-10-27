/*
    nearestraces.js
    Caleb Kornegay
    10/27/2023
    Fetches the nearest races array from /v1/nearest/
*/
import { V1NEARESTRACESJSON } from './urls';


export default async function getnearestraces(){
	return getdata();
}

async function getdata(){
	return fetch(V1NEARESTRACESJSON)
		.catch(error => {
			console.warn(error);
		}).then(response => {
			return response.json();
		}).catch(error => {
			console.warn(error);
		}).then(races => {
			return JSON.parse(JSON.stringify(races));
		}).catch(error => {
			console.warn(error);
		});
}
