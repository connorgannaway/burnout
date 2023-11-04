/*
    briefs.js
    Caleb Kornegay
    10/27/2023
    Grabs nearest races from the /v1/nearest/ endpoint
    Then async fetches all the race briefs from /v1/<int:pk>/brief endpoint
    And returns cards for them.
    Bug -- Resolves twice because of Promise.all(), don't know how to fix yet.
*/
import { BASEURL } from './urls';
import getnearestraces from './nearestraces';
import BaseCard from '../components/card';
import React from 'react';
import { timeZoneCalc}  from '../functions/timezonecalc';

async function grabcard(id){
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
            return (<BaseCard 
                where={null}
                name={data['name']}
                subName={data['track']}
                body={timeZoneCalc(data['time'])+' '+data['date']+' '+data['rstatus']}
                bgcolor={'#ff0000'}
                key={data['date']+data['time']+Math.floor(Math.random()*6500000 + 1)}
                message={'This is a race brief'}
            />
            );
        }).catch(error => {
            console.warn(error);
        });
}

async function getdata(ids){
    const ret = [];
    let i;
    const today = ids['today'];
    const past = ids['past'];
    const future = ids['past'];
    for(i = 0; i < future.length; i++){
        ret.push(grabcard(future[i]));
    }
    for(i = 0; i < today.length; i++){
        ret.push(grabcard(today[i]));
    }
    for(i = 0; i < past.length; i++){
        ret.push(grabcard(past[i]));
    }
    return Promise.all(ret);
}

export default async function getbriefs(date){
	return await getdata(await getnearestraces(date));
}
