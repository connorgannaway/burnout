/*
    dateformat.js
    Cody Allen
    11/4/23

    Takes date in YYYY-MM-DD format and formats it
    to the month as a word

    Ex 2023-11-04 will be 'Nov 4 2023'
*/

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function dateFormat(dateString) {
    const dateParts = dateString.split('-');

    // const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    // const day = parseInt(dateParts[2]);

    const formattedDate = monthNames[month]+' '+dateParts[2]+' '+dateParts[0]+' ';
    return formattedDate
}