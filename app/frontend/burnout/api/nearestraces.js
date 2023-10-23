import { V1NEARESTRACESJSON } from "./urls";

export default async function getnearestraces(){
    const ret = await getdata();
    return ret;
}

async function getdata(){
    const response = await fetch(V1NEARESTRACESJSON)
    .catch(error => {
        console.warn(error);
    }).then(async response => {
        const races = await response.json();
        return races;
    }).catch(error => {
        console.warn(error);
    }).then(races => {
        return JSON.parse(JSON.stringify(races));
    }).catch(error => {
        console.warn(error);
    })
    return response;
}
