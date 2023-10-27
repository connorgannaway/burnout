/* 
    racescreen.js
    Nick Lindsey
    10/27/2023
    comment here pls
*/
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0',
		padding: 20,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#333',
		marginBottom: 20,
	},
	date: {
		fontSize: 18,
		color: '#666',
		marginBottom: 20,
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
	tableHeader: {
		fontWeight: 'bold',
	},
	tableCell: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tableText: {
		fontSize: 18,
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
});

export default class RaceScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			raceTitle: 'Grand Prix',
			raceDate: '10/8/2021',
			drivers: [
				{ name: 'Max Verstappen', score: '1' },
				{ name: 'Lewis Hamilton', score: '2' },
				{ name: 'Valtteri Bottas', score: '3' },
			],
			outcome: 'X team won!',
			additionalInfo: 'This race was part of the a world championship series.'
		};
	}

	render() {
		const { raceTitle, raceDate, drivers, outcome, additionalInfo } = this.state;

		return (
			<ScrollView style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>{raceTitle}</Text>
					<Text style={styles.date}>{raceDate}</Text>
				</View>

				<Text style={styles.sectionTitle}>Results</Text>
				<View style={styles.table}>
					<View style={styles.tableRow}>
						<View style={styles.tableCell}><Text style={[styles.tableText, styles.tableHeader]}>Driver</Text></View>
						<View style={styles.tableCell}><Text style={[styles.tableText, styles.tableHeader]}>Score</Text></View>
					</View>
					{drivers.map((driver, index) => (
						<View key={index} style={styles.tableRow}>
							<View style={styles.tableCell}><Text style={styles.tableText}>{driver.name}</Text></View>
							<View style={styles.tableCell}><Text style={styles.tableText}>{driver.score}</Text></View>
						</View>
					))}
				</View>

				{additionalInfo && (
					<>
						<Text style={styles.sectionTitle}>Additional Information</Text>
						<Text style={styles.outcome}>{additionalInfo}</Text>
					</>
				)}
			</ScrollView>
		);
	}
}