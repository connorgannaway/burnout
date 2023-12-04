import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const styles = StyleSheet.create({
  calendarContainer: {
    padding: 0,
    borderColor: '#a0a0a0',
    borderWidth: 10,
    borderRadius: 10,
  },
});

class DateRangePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: '',
    };
  }

  onDayPress = (day) => {
    const dateString = `${day.year}-${day.month}-${day.day}`;
    const dateWithNoTimezoneIssues = new Date(day.year, day.month - 1, day.day, 12);

    // Set the selected date
    this.setState({ selectedDate: dateString });


    // Call the provided callback function with the new date
    if (this.props.onDateSelected) {
      this.props.onDateSelected(dateWithNoTimezoneIssues);
    }

  };

  render() {
    return (
    <SafeAreaView>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={this.onDayPress}
          markedDates={{
            [this.state.selectedDate]: {
              selected: true,
              selectedColor: 'red',
              textColor: 'white',
            },
          }}
          theme={{
            selectedDayBackgroundColor: 'red',
            todayTextColor: 'red',
            dotColor: 'red',
            arrowColor: 'red',
            monthTextColor: 'red',
            textMonthFontWeight: 'bold',
            textDayFontWeight: 'bold',
          }}
          markingType='simple'
        />
      </View>
      </SafeAreaView>
    );
  }
}

export default DateRangePicker;
