/*
    nearestraces.js
    Caleb Kornegay
    10/27/2023
    Fetches the nearest races array from /v1/nearest/
*/
import { V1NEARESTRACESJSON } from './urls';

async function getdata(date){
    return date == null ? fetch(V1NEARESTRACESJSON)
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
    }) : 
    fetch(V1NEARESTRACESJSON+'&date='+date)
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

export default async function getnearestraces(date){
	return getdata(date);
}
