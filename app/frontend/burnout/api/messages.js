/*
    messages.js
    Caleb Kornegay
    10/27/2023
    Fetches all the messages from the /v1/messages/ endpoint
    and returns cards for them.
*/
import { V1MESSAGESJSON } from './urls';
import BaseCard from '../components/card';
import React from 'react';

async function getdata() {
    return fetch(V1MESSAGESJSON)
        .catch(error => {
            console.warn(error);
        })
        .then(fetched => {
            return fetched.json();
        }).catch(error => {
            console.warn(error);
        }).then(messages => {
            return JSON.parse(JSON.stringify(messages));
        }).catch(error => {
            console.warn(error);
        }).then(data => {
            const ret = [];
            for(let i = 0; i < Object.keys(data).length; i++){
                ret.push(
                    <BaseCard navigation={null}
                        key={data[i]['title']+data[i]['message']}
                        where={null}
                        name={data[i]['title']}
                        subName={'This is message #'+data[i]['pk']}
                        body={data[i]['message']}
                        bgcolor={'#ff0000'}
                        message={'This is a message'}
                    />
                );
            }
            return ret;
        }).catch(error => {
            console.warn(error);
        });
}


export default async function getmessages(){
	return await getdata();
}

