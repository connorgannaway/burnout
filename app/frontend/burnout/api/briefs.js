import { BASEURL } from './urls';
import getnearestraces from './nearestraces';
import BaseCard from '../components/card';

export default async function getbriefs(){
    const data = await getnearestraces();
    const ret = await getdata(data);
    // console.log('This is in getbriefs before return', ret);
    return ret;
}

async function getdata(ids){
    let ret = [];
    let card;
    const today = ids['today'];
    const past = ids['past'];
    const future = ids['past'];
    for(let i = 0; i < today.length; i++){
        card = await grabcard(today[i]);
        ret.push(card);
    }
    for(let i = 0; i < past.length; i++){
        card = await grabcard(past[i]);
        ret.push(card);
    }
    for(let i = 0; i < future.length; i++){
        card = await grabcard(future[i]);
        ret.push(card);
    }
    return ret;
}

async function grabcard(id){
    const response = await fetch(BASEURL+'/v1/races/'+id+'/brief/?format=json')
    .catch(error => {
        console.warn(error);
    }).then(async response => {
        const json = await response.json();
        return json;
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
            key={data['time']+data['date']}
        />
            );
    }).catch(error => {
        console.warn(error);
    });
    return response;
}
