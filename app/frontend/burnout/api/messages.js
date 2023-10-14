import { APIURL } from '../App';

export default async function getmessages() {
        return await fetch(APIURL+'/v1/messages/?format=json')
        .then(async fetched => {
            return await fetched.json()
        })
        .catch(error => {
            console.warn(error);
        })
        .then(messages => {
            return JSON.parse(JSON.stringify(messages))
        })
}