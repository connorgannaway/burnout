/*
    urls.js
    Caleb Kornegay
    Aaron King
    Andrew Lindstrom
    10/27/2023
    Export consts so that we can do fetches to the backend endpoint.
*/
export const BASEURL='https://pitwall.connorgannaway.net';
// APIURL so we can concatenate extensions and variables to query api

export const V1MESSAGESJSON=BASEURL+'/v1/messages/?format=json';

export const V1NEARESTRACESJSON=BASEURL+'/v1/races/nearest/?format=json';

export const V1TEAMSJSON=BASEURL+'/v1/teams/?format=json';

export const V1LEAGUESJSON=BASEURL+'/v1/leagues/?format=json';