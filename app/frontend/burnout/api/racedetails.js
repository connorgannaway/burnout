import { BASEURL } from './urls';

/*
 * getRaceData makes a fetch request based on a given race ID
 *      id: the ID for the desired race data
 */
export default async function getRaceData(id) {
    return fetch (BASEURL+'/v1/races/'+id+'/?format=json')
    .catch(error => {
        console.warn(error);
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.warn(error);
    }).then(data => {
        return JSON.parse(JSON.stringify(data));
    }).catch(error => {
        console.warn(error);
    });
}
