/*
 * leaguedetails.js
 * Andrew Lindstrom
 * 11/6/2023
 */
import { BASEURL } from './urls';

/*
 * getLeagueData makes a fetch request based on a given league ID
 *      id: the ID for the desired league data
 */
async function getLeagueData(id){

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

/*
 * getConstructorDetails splits the constructor out of the league details 
 * returned by getLeagueData
 */
export async function getConstructorDetails(league){

    const data = await getLeagueData(league);
    const constructors = data.constructors;
    const constructorDetails = constructors.map((constructor) => {return {id:constructor.constructorId, 
                                                                        data:[constructor.position, 
                                                                              constructor.name,
                                                                              constructor.nationality,
                                                                              constructor.stats.points]};
                                                                            });

    return constructorDetails.flat();
}

/*
 * getDriverDetails splits the constructor out of the league details 
 * returned by getLeagueData
 */
export async function getDriverDetails(league){

    const data = await getLeagueData(league);
    const drivers = data.drivers;
    const driverDetails = drivers.map((driver) => {return {id:driver.driverId,
                                                         data:[driver.position, 
                                                               driver.firstname + ' ' + driver.surname, 
                                                               driver.statistics.podiums, 
                                                               driver.statistics.points]};
                                                            });

    return driverDetails.flat();
}

/*
 * getRaces splits the constructor out of the league details 
 * returned by getLeagueData
 */
export async function getRaces(league){
    const data = await getLeagueData(league);
    const races = data.races;
    
    return races;
}