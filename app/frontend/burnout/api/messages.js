import { V1MESSAGESJSON } from './urls';
import BaseCard from '../components/card';
import React from 'react';


export default async function getmessages(){
	return await getdata();
}
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
			ret = [];
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
}
