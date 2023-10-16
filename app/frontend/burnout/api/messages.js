import { V1MESSAGESJSON } from './urls';
import BaseCard from '../components/card';
import react from 'react';

export default async function getmessages() {
	return await fetch(V1MESSAGESJSON)
		.catch(error => {
			console.warn(error);
		})
		.then(async fetched => {
			return await fetched.json();
		}).catch(error => {
			console.warn(error);
		}).then(messages => {
			return JSON.parse(JSON.stringify(messages));
		}).catch(error => {
			console.warn(error);
		}).then(data => {
			// console.log(data);
			const ret = [];
			for(let i = 0; i < Object.keys(data).length; i++){
				ret.push(
					<BaseCard navigation={null}
						where={null}
						name={data[i]['title']}
						subName={'This is message #'+data[i]['pk']}
						body={data[i]['message']}
						bgcolor={'#ff00ff'}/>
				);
			}
			// console.log(ret);
			return ret;
		}).catch(error => {
			console.warn(error);
		});
}