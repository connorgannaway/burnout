/*
    briefs.js
    Caleb Kornegay
    Andrew Lindstrom
    10/27/2023
    Grabs nearest races from the /v1/nearest/ endpoint
    Then async fetches all the race briefs from /v1/<int:pk>/brief endpoint
    And returns cards for them.
*/
import { BASEURL } from './urls';
import getnearestraces from './nearestraces';
import BaseCard from '../components/card';
import React from 'react';
import { timeZoneCalc}  from '../functions/timezonecalc';
import { dateFormat } from '../functions/dateformat';


async function getRaceDetails(id){
    return fetch(BASEURL+'/v1/races/'+id+'/brief/?format=json')
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

async function grabcard(id, {navigation}){
    const data = await getRaceDetails(id);
    return (<BaseCard 
                where={'RaceScreen'}
                navigation={navigation}
                name={data['name']}
                subName={data['track']}
                body={timeZoneCalc(data['time'])+' '+dateFormat(data['date'])+' '+data['rstatus']}
                bgcolor={'#e0e3e0'}
                key={data['date']+data['time']}
                message={'This is a race brief'}
                raceID={id}
            />
    );
}

async function getdata(ids, {navigation}){
    const ret = [];
    let i;
    const today = ids['today'];
    const past = ids['past'];
    const future = ids['future'];
    for(i = 0; i < future.length; i++){
        ret.push(grabcard(future[i], {navigation}));
    }
    for(i = 0; i < today.length; i++){
        ret.push(grabcard(today[i], {navigation}));
    }
    for(i = 0; i < past.length; i++){
        ret.push(grabcard(past[i], {navigation}));
    }
    return Promise.all(ret);
}

export default async function getbriefs(date, {navigation}){
	return await getdata(await getnearestraces(date), {navigation});
}

/*
 * Gets the race closest to the specified date
 *  params:
 *      date: date to begin search for races
 */
export async function getRace(date){
    const races = await getnearestraces(date);
    return await getRaceDetails(races.past[0]);
}
