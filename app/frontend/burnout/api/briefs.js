import { BASEURL } from './urls';
import getnearestraces from './nearestraces';
import BaseCard from '../components/card';

export default async function getbriefs(){
    return await getdata(await getnearestraces());
}

async function getdata(ids){
    let ret = [];
    let card;
    const today = ids['today'];
    const past = ids['past'];
    const future = ids['past'];
    for(let i = 0; i < future.length; i++){
        card = grabcard(future[i]);
        ret.push(card);
    }
    for(let i = 0; i < today.length; i++){
        card = grabcard(today[i]);
        ret.push(card);
    }
    for(let i = 0; i < past.length; i++){
        card = grabcard(past[i]);
        ret.push(card);
    }
    return Promise.all(ret);
}

async function grabcard(id){
    return await fetch(BASEURL+'/v1/races/'+id+'/brief/?format=json')
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
            key={data['track']+data['date']+data['time']}
            message={'This is a race brief'}
            />
            );
    }).catch(error => {
        console.warn(error);
    });
}
