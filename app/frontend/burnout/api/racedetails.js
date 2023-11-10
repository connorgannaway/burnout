import { BASEURL } from './urls';

/*
 * getRaceData makes a fetch request based on a given race ID
 *      id: the ID for the desired race data
 */
async function getRaceData(id) {
    const url = `${BASEURL}/v1/races/${id}/?=format.json`;

    try {
        const response = await fetch(url);
        const json = await response.json();
        return json; 
    } catch (error) {
        console.warn('Error fetching race data:', error);
        throw error; 
    }
}

/*
 * getRaceBrief extracts the brief for a race from the race details 
 * returned by getRaceData
 */
export async function getRaceBrief(id) {
    const raceData = await getRaceData(id);
    const brief = raceData.brief;
    return brief;
}

/*
 * getRaceResults extracts the results for a race from the race details 
 * returned by getRaceData
 */
export async function getRaceResults(id) {
    const raceData = await getRaceData(id);
    const results = raceData.results;
    return results.map(result => ({
        id: result.driverId,
        data: [
            result.position,
            result.driverName,
            result.laps,
            result.time,
            result.status,
        ],
    })).flat();
}

/*
 * getRaceSchedule extracts the schedule of events for a race from the race details 
 * returned by getRaceData
 */
export async function getRaceSchedule(id) {
    const raceData = await getRaceData(id);
    const schedule = {
        practice: [raceData.fp1_date, raceData.fp1_time, raceData.fp2_date, raceData.fp2_time, raceData.fp3_date, 
            raceData.fp3_time],
        qualifying: [raceData.quali_date, raceData.quali_time],
        sprint: [raceData.sprint_date, raceData.sprint_time],
        race: [raceData.date, raceData.time],
    };
    return schedule; 
}

export default {
    getRaceData,
    getRaceBrief,
    getRaceResults,
    getRaceSchedule,
};