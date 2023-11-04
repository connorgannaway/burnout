/* 
    timezonecalc.js
    Cody Allen
    11/4/23
    Will get the race time and convert it to the correct time zone for
    the user
    
    timeString is HH:MM:SS as a string given from the API
*/

import parseTime from 'parsetime.js'

export function timeZoneCalc(timeString) {
    const time = parseTime(timeString);
    const now = new Date();
    const utcOffset = now.getTimezoneOffset() / 60; // Divide by 60 because method returns offset in minutes

    var hour = time.hours;
    var minute = time.minutes;
    var second = time.seconds;

    hour = (hour + utcOffset + 24) % 24;

    const returnString = '$(hour):$(minute):$(second)';
    return returnString;
}