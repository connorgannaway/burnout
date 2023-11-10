import { V1RACESJSON } from './urls';

async function getdata(){
    return await fetch(V1RACESJSON)
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
            return data;
        }).catch(error => {
            console.warn(error);
        });
}

export async function getRaces(){
	return getdata();
}