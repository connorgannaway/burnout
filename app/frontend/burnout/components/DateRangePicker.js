/*
    daterangepicker.js
    Peyton Davis 
    10/27/2023
    Calendar is one day off, please fix, we also only need one day, not a range
*/
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const styles = StyleSheet.create({
    calendarContainer: {
        padding: 100,
        paddingBottom: 50,
    },
});

const DateRangePicker = ({ onRangeSelected }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onDayPress = (day) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(day.dateString);
            setEndDate(null);
        } else if (!endDate) {
        setEndDate(day.dateString);
        onRangeSelected(new Date(startDate), new Date(day.dateString));
        }
    };

    return (
        <View>
            <Calendar
                onDayPress={onDayPress}
                markingType='period'
                markedDates={{
                    [startDate]: {
                        startingDay: true,
                        color: 'red',
                        textColor: 'white'
                    },
                    [endDate]: {
                        endingDay: true,
                        color: 'red',
                        textColor: 'white'
                    }
                }}
            />
        </View>
    );
};

export default DateRangePicker;