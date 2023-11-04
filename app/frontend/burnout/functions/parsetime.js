/* 
    parsetime.js
    Cody Allen
    11/4/23
    Function to take time as a string HH:MM:SS and 
    returns a separate hour, minute, and second int
*/

export function parseTime(timeString) {
    // Splits the time into HH MM SS
    const timeParts = timeString.split(':');

    // Ensure there are exactly three parts (hours, minutes, and seconds)
    if (timeParts.length !== 3) {
        throw new Error("Invalid time format. Should be HH:MM:SS");
    }

    // Converts each part of the split string into ints
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseInt(timeParts[2]);

    // Check if the parsed values are within valid ranges
    if (
        isNaN(hours) ||
        isNaN(minutes) ||
        isNaN(seconds) ||
        hours < 0 || hours > 23 ||
        minutes < 0 || minutes > 59 ||
        seconds < 0 || seconds > 59
    ) {
        throw new Error("Invalid time values. Check the hours, minutes, and seconds.");
    }

    return { hours, minutes, seconds };
}