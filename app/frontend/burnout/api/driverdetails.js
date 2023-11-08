/* 
    driverdetails.js
    Aaron King 
    11/8/2023
    pulling data from API for driver screen
*/
import { BASEURL } from './urls';
import BaseCard from '../components/card';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0',
		padding: 20,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#333',
		flex: 1,
	},
	date: {
		fontSize: 18,
		color: '#666',
		marginLeft: 10,
	},
	sectionTitle: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#444',
		marginBottom: 10,
	},
	list: {
		marginBottom: 20,
	},
	listItem: {
		fontSize: 18,
		color: '#555',
		marginBottom: 5,
	},
	outcome: {
		fontSize: 18,
		color: '#555',
		marginBottom: 20,
	},
	table: {
		borderWidth: 1,
		borderColor: '#ccc',
	},
	tableRow: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		padding: 10,
	},
	tableCell: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tableText: {
		fontSize: 18,
	},
	tableHeaderText: {
		fontWeight: 'bold',
	},
});

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
        }).then(data => {
            return (<View>
                <BaseCard
                    where={null}
                    message={'scrum master'}
                    name={data.firstname + ' ' + data.surname}
                    body={'Number: ' + data.number + '\n' + 
                          'Team: ' + data.results[0].constructor + '\n' +
                          'Total Driver Points: ' + data.results[0].points + '\n' +
                          'Wins: ' + data.results[0].wins +
                          '\n' + 'Driver Position: ' + data.results[0].position + '\n' + 
                          'Date of Birth: ' + data.dob + '\n' + 
                          'Nationality: ' + data.nationality}
                    subName={data.code}
                    bgcolor={'#ff0000'}
                />
            </View>
            );
        }).catch(error => {
            console.warn(error);
        });
}

export default async function getdriverdetails(id, {navigation}){
	return await getdata(id, {navigation});
}
