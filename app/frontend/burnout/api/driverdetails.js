/* 
    driverdetails.js
    Aaron King 
    11/8/2023
    pulling data from API for driver screen
*/
import { BASEURL } from './urls';
import BaseCard from '../components/card';
import React from 'react';

async function buildcards(data) {
    const ret = [];
    ret.push(<BaseCard
        where={null}
        message={'scrum master'}
        name={data.firstname + ' ' + data.surname}
        body={'Short name: ' + data.code + '\nNumber: ' + data.number + '\n' + 
              'Date of Birth: ' + data.dob + '\n' + 
              'Nationality: ' + data.nationality}
        key={data.driverId}
        bgcolor={'#ff0000'}
    />);

    for (let i = 0; i < data.results.length; ++i) {
        ret.push(<BaseCard 
            where={null}
            message={'scrum master'}
            name={data.surname}
            body={'Year: ' + data.results[i].year + '\nTeam: ' + data.results[i].constructor + 
            '\nPosition: ' + data.results[i].position + '\nWins: ' + data.results[i].wins + 
            '\nPoints: ' + data.results[i].points
            }
            bgcolor={'#ff0000'}
            key={data.results[i].year}
            />);
    }
    return ret;
}

async function getdata(id, {navigation}){
    // const {id} = this.props;
    return await fetch(BASEURL+'/v1/drivers/'+id+'/?=format.json')
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
        }).then(async data => {
            // return (<View>
                // <BaseCard
                //     where={null}
                //     message={'scrum master'}
                //     name={data.firstname + ' ' + data.surname}
                //     body={'Number: ' + data.number + '\n' + 
                //           'Team: ' + data.results[0].constructor + '\n' +
                //           'Total Driver Points: ' + data.results[0].points + '\n' +
                //           'Wins: ' + data.results[0].wins +
                //           '\n' + 'Driver Position: ' + data.results[0].position + '\n' + 
                //           'Date of Birth: ' + data.dob + '\n' + 
                //           'Nationality: ' + data.nationality}
                //     subName={data.code}
                //     bgcolor={'#ff0000'}
                // />
            // </View>
            return await buildcards(data);
        }).catch(error => {
            console.warn(error);
        });
}

export default async function getdriverdetails(id, {navigation}){
	return await getdata(id, {navigation});
}
