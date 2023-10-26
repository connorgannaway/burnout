import { BASEURL } from './urls';
import getnearestraces from './nearestraces';
import BaseCard from '../components/card';

export default async function getbriefs(){
	return await getdata(await getnearestraces());
}

async function getdata(ids){
	let ret = [], i;
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
				body={data['time']+' '+data['date']+' '+data['rstatus']}
				bgcolor={'#ff00ff'}
				key={data['date']+data['time']+Math.floor(Math.random()*6500000 + 1)}
				message={'This is a race brief'}
			/>
			);
		}).catch(error => {
			console.warn(error);
		});
}
