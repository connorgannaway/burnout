import { V1MESSAGESJSON } from './urls';
import BaseCard from '../components/card';
import React from 'react';


export default async function getmessages(){
    const data = await getdata();
    return data;
}
async function getdata() {
	const response = await fetch(V1MESSAGESJSON)
		.catch(error => {
			console.warn(error);
		})
		.then(async fetched => {
			const messages = await fetched.json();
            return messages;
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
						bgcolor={'#ff00ff'}
                        message={'This is a message'}
                        />
				);
			}
			return ret;
		}).catch(error => {
			console.warn(error);
		});
        return response;
}
