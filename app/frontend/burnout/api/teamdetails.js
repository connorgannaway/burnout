/* 
    teamdetails.js
    Aaron King 
    11/2/2023
    Pulling data from API for TeamMasterScreen
*/
import { BASEURL } from './urls';
import BaseCard from '../components/card';
import { View } from 'react-native';
import React from 'react';

async function getdata(id, {navigation}){
    // const {id} = this.props;
    return await fetch(BASEURL+'/v1/teams/'+id+'/?=format.json')
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
            return (<View>
                <BaseCard
                    where={null}
                    message={'scrum master'}
                    name={data['name']}
                    body={'Total Team Points: ' + data.results[0].points}
                    subName={'Position: '+data.results[0].position}
                    bgcolor={'#ff0000'}
                />
                {Array.from({ length: data.results[0].drivers.length }).map((_,i) => (
                    <BaseCard 
                        key={i}
                        name={data.results[0].drivers[i].firstname + ' ' + data.results[0].drivers[i].surname}
                        subName={'Driver Position: ' + data.results[0].drivers[i].position}
                        body={'Click to view data on ' + data.results[0].drivers[i].firstname + ' ' +
                                data.results[0].drivers[i].surname}
                        bgcolor={'#ff1801'}
                        where={'DriverMasterScreen'}
                        navigation={navigation}
                        title={data.results[0].drivers[i].firstname + ' ' + data.results[0].drivers[i].surname}
                        id={data.results[0].drivers[i].driverId}
                    />
                ))}
            </View>);
            // return (<View><Text>{data.name}:{'\n'}
            // Points: {data.results[0].points}{'\n'}
            // Drivers:{'\n'}
            // {data.results[0].drivers.map(item => 
            // <Text>           {item.firstname} {item.surname} {'\n'} </Text>)}
            // </Text></View>);
        }).catch(error => {
            console.warn(error);
        });
}

export default async function getteamdetails(id, {navigation}){
	return await getdata(id, {navigation});
}
