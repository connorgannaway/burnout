/* 
	racescreen.js
	Nick Lindsey
	10/27/2023
    This screen is displayed when a user clicks on a race preview card.
	Resolved styling redundancy 
*/

import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import getRaceData from '../api/racedetails'; 
import BaseCard from '../components/card';

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
            raceData: getRaceData(this.props.route.params?.raceId),
            raceResults: [],
            raceSchedule: {},
        };

        this.state.raceData.catch(error => {
            console.warn(error);
        }).then(raceData => {
            this.setState({raceSchedule: {
                practiceDate: [raceData.fp1_date, raceData.fp2_date, raceData.fp3_date],
                practiceTime: [raceData.fp1_time, raceData.fp2_time, raceData.fp3_time],
                qualifying: [raceData.quali_date, raceData.quali_time],
                sprint: [raceData.sprint_date, raceData.sprint_time],
                race: [raceData.date, raceData.time],
            }});
            this.setState({raceResults: raceData['grid']});
            this.setState({isLoading: false});
            this.forceUpdate();
        }).catch(error => {
            console.warn(error);
        });
    }

    getTime(result) {
        return result.time.substring(0,1) === '\\' ? result.status : result.time;
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text>Loading Results...</Text>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (
            <ScrollView style={styles.container}>
              <Text style={styles.sectionTitle}>Race Results</Text>
              {this.state.raceResults !== undefined && this.state.raceResults.length > 0 ? (
                this.state.raceResults.map((result, index) => (
                <View key={index}>
                    <BaseCard 
                        navigation={null}
                        where={null}
                        bgcolor={'#808080'}
                        name={result.name}
                        subName={result.constructor}
                        body={
                            'Ending Position: ' + result.position + 
                            '\nStarting Position: ' + result.startingPosition + 
                            '\nPoints: ' + result.points +
                            '\nTime: ' + this.getTime(result) + 
                            '\nLaps: ' + result.laps
                        }
                    />
                </View>
                ))
              ) : (
                <Text>No race results available.</Text>
              )}
          
              <Text style={styles.sectionTitle}>Race Schedule</Text>
              {this.state.raceSchedule.practiceDate ? (
                <View style={styles.list}>
                  <Text style={styles.listItem}>Practice Sessions:</Text>
                  {this.state.raceSchedule.practiceDate.map((session, index) => (
                    session !== null ? <Text key={index} style={styles.listItem}>
                      {`Session ${index + 1}: ${session} at ${this.state.raceSchedule.practiceTime[index]}`}
                    </Text> : null
                  ))}
                </View>
              ) : null}

              {this.state.raceSchedule.qualifying[0] !== null ? (
                <View style={styles.list}>
                  <Text style={styles.listItem}>
                    Qualifying: {this.state.raceSchedule.qualifying[0]} at {this.state.raceSchedule.qualifying[1]}
                  </Text>
                </View>
              ) : 
                <View style={styles.list}>
                    <Text style={styles.listItem}>
                        No qualifying data at this time
                    </Text>
                </View>}

              {this.state.raceSchedule.sprint[0] !== null ? (
                <View style={styles.list}>
                  <Text style={styles.listItem}>
                    Sprint: {this.state.raceSchedule.sprint[0]} at {this.state.raceSchedule.sprint[1]}
                  </Text>
                </View>
              ) : 
                <View style={styles.list}>
                    <Text style={styles.listItem}>
                        No sprint data at this time
                    </Text>
                </View>}

              {this.state.raceSchedule.race[0] !== null ? (
                <View style={styles.list}>
                  <Text style={styles.listItem}>
                    Race: {this.state.raceSchedule.race[0]} at {this.state.raceSchedule.race[1]}
                  </Text>
                </View>
              ) : 
                <View style={styles.list}>
                    <Text style={styles.listItem}>
                        No race data at this time
                    </Text>
                </View>}
              </ScrollView>
          );
    }
}
