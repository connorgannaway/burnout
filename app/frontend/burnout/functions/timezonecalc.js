/* 
    timezonecalc.js
    Cody Allen
    11/4/23
    Will get the race time and convert it to the correct time zone for
    the user
    
    timeString is HH:MM:SS as a string given from the API
*/

import { parseTime}  from '../functions/parsetime.js'

export function timeZoneCalc(timeString) {
    const time = parseTime(timeString);
    const now = new Date();
    const utcOffset = now.getTimezoneOffset() / 60; // Divide by 60 because method returns offset in minutes

    var hour = time.hours;
    var minute = time.minutes;
    var second = time.seconds;

    hour = (hour - utcOffset + 24) % 24; // Subtract offset because offset is actually UTC-local, so the return type is opposite

    const formattedHours = hour.toString().padStart(2, '0');
    const formattedMinutes = minute.toString().padStart(2, '0');
    const formattedSeconds = second.toString().padStart(2, '0');

    const returnString = formattedHours+':'+formattedMinutes; // Only returning HH:MM because seconds seem redundant
    return returnString;
}