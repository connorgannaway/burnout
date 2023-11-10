/* 
	racescreen.js
	Nick Lindsey
	10/27/2023
    This screen is displayed when a user clicks on a race preview card.
	Resolved styling redundancy 
*/

import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { getRaceBrief, getRaceResults, getRaceSchedule } from '../api/racedetails'; 

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

export default class RaceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            raceBrief: null,
            raceResults: [],
            raceSchedule: {},
        };
    }

    componentDidMount() {
        this.loadRaceDetails();
    }

    loadRaceDetails = async () => {
        const raceId = this.props.route.params.raceId;
        try {
            const raceBrief = await getRaceBrief(raceId);
            const raceResults = await getRaceResults(raceId);
            const raceSchedule = await getRaceSchedule(raceId);
            this.setState({
                raceBrief,
                raceResults,
                raceSchedule,
                isLoading: false,
            });
        } catch (error) {
            console.warn('Error fetching race details:', error);
            this.setState({ isLoading: false }); 
        }
    };

    render() {
        const { isLoading, raceBrief, raceResults, raceSchedule } = this.state;

        if (isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (
            <ScrollView style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>{raceBrief.name}</Text>
                <Text style={styles.date}>{raceBrief.date}</Text>
              </View>
          
              <Text style={styles.sectionTitle}>Race Results</Text>
              {raceResults.length > 0 ? (
                raceResults.map((result, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text>Position: {result.position}</Text>
                    <Text>Driver: {result.driverName}</Text>
                    <Text>Laps: {result.laps}</Text>
                    <Text>Time: {result.time}</Text>
                    <Text>Status: {result.status}</Text>
                  </View>
                ))
              ) : (
                <Text>No race results available.</Text>
              )}
          
              <Text style={styles.sectionTitle}>Race Schedule</Text>
              {raceSchedule.practice ? (
                <View style={styles.list}>
                  <Text style={styles.listItem}>Practice Sessions:</Text>
                  {raceSchedule.practice.map((session, index) => (
                    <Text key={index} style={styles.listItem}>
                      {`Session ${index + 1}: ${session.date} at ${session.time}`}
                    </Text>
                  ))}
                </View>
              ) : null}
              {raceSchedule.qualifying ? (
                <View style={styles.list}>
                  <Text style={styles.listItem}>
                    Qualifying: {raceSchedule.qualifying.date} at {raceSchedule.qualifying.time}
                  </Text>
                </View>
              ) : null}
              {raceSchedule.sprint ? (
                <View style={styles.list}>
                  <Text style={styles.listItem}>
                    Sprint: {raceSchedule.sprint.date} at {raceSchedule.sprint.time}
                  </Text>
                </View>
              ) : null}
              {raceSchedule.race ? (
                <View style={styles.list}>
                  <Text style={styles.listItem}>
                    Race: {raceSchedule.race.date} at {raceSchedule.race.time}
                  </Text>
                </View>
              ) : null}
              </ScrollView>
          );
    }
}