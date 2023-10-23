import * as React from 'react';
import { Card, Title } from 'react-native-paper';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

const StandingsCard = ({ data }) => (
  <Card style={styles.container}>
    <Card.Content>
      <Title style={styles.title}>Standings</Title>
    </Card.Content>
    <Card.Content style={styles.content}>
      <View style={styles.rowsContainer}>
        {data.map((driver, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.leftTextContainer}>
              <Text style={styles.leftText}>{driver.position}. {driver.name}</Text>
            </View>
            <View style={styles.rightTextContainer}>
              <Text style={styles.rightText}>Points: {driver.points}</Text>
            </View>
          </View>
        ))}
      </View>
    </Card.Content>
  </Card>
);

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    width: screen.width / 1.15,
    padding: screen.width / 24,
    marginTop: screen.height / 96,
    marginBottom: screen.height / 96,
    borderRadius: 15,
    backgroundColor: '#ff1801',
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  rowsContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
    marginBottom: 8,
  },
  leftTextContainer: {
    flex: 1,
  },
  rightTextContainer: {
    flex: 1,
  },
  leftText: {
    color: 'white',
  },
  rightText: {
    color: 'white',
  },
});

export default StandingsCard;