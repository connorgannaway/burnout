import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

const styles = StyleSheet.create({
    calendarContainer: {
        padding: 100,
        paddingBottom: 50,
    },
});

const DateRangePicker = ({ onDateSelected }) => {
    const [selectedDate, setSelectedDate] = useState('');

    const onDayPress = (day) => {

        const dateWithNoTimezoneIssues = new Date(day.year, day.month - 1, day.day, 12);

        // Set the selected date
        setSelectedDate(day.dateString);

        // Log to console
        console.log(day.dateString);

        // Call the provided callback function with the new date
        if (onDateSelected) {
            onDateSelected(dateWithNoTimezoneIssues);
        }
    };

    return (
        <View style={styles.calendarContainer}>
            <Calendar
                onDayPress={onDayPress}
                markedDates={{
                    [selectedDate]: {
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
                }}
                // The 'simple' marking type for single day selection
                markingType='simple'
            />
        </View>
    );
};

export default DateRangePicker;
