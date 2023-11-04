/*
 *
 */
import { V1LEAGUESJSON } from './urls';

async function getdata(){
    return await fetch(V1LEAGUESJSON)
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
export async function getLeagues(){
	return getdata();
}
