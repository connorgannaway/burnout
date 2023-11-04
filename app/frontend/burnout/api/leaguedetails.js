/*
 *
 */
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { BASEURL } from './urls';

async function getdata(id){
    return await fetch(BASEURL+'/v1/leagues/' + id + '/?=format.json')
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
            return data;
        }).catch(error => {
            console.warn(error);
        });
}

export async function getConstructorDetails(){

    const data = await getdata("1");
    const constructors = data.constructors;
    const constructorDetails = constructors.map((constructor) => [constructor.position, constructor.name, constructor.nationality, constructor.stats.points]);
    constructorDetails.unshift(["#", "name", "nationality", "points"]);

    return constructorDetails.flat();
}

export async function getDriverDetails(){

    const data = await getdata("1");
    const drivers = data.drivers;
    const driverDetails = drivers.map((driver) => [driver.position, driver.firstname + " " + driver.surname, driver.nationality, driver.statistics.points]);
    driverDetails.unshift(["#", "name", "nationality", "points"]);

    return driverDetails.flat();
}