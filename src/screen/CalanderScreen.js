import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-hijri';
import { Calendar } from 'react-native-calendars';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { toHijri } from 'hijri-converter';
import momentH from 'moment-hijri';

const CalanderScreen = () => {
  //const [currentMonth, setCurrentMonth] = useState(moment().toHijri().format('iM')); // Current Hijri month

  const [selectedDate, setSelectedDate] = useState(moment());
  const [arDate, setArDate] = useState()
  const date = new Date()
  
  useEffect(()=>{
    const currentDate = moment();
//const dateOneDayBefore = currentDate.clone().subtract(1, 'days');
      convertDataInToAr(currentDate)
  }, [])

   const convertDataInToAr = (dates) => {
    console.log("========== selectedDate ", selectedDate)
    const itlD = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', 
    {day: 'numeric', month: 'long',weekday: 'long',year : 'numeric', timeZoneName:  'long'}).format(dates)
    console.log("========== itlD ", itlD)
     setArDate(itlD)
   }

//   const renderDay = (day) => {
//     // const hijriDate = toHijri(day);
//     // console.log("=========, hijriDate", hijriDate)
//     return {
//       ...day,
//       hijri: arDate,
//     };
//   };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        onDayPress={(day) => {
            console.log('selected day', day)
            let date = moment(day.dateString)
           // const dateOneDayBefore = moment(day.dateString).subtract(1, 'days')
            convertDataInToAr(date)
           
            setSelectedDate(date)
        }}
        markedDates={selectedDate}
        //renderDay={renderDay}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style ={{flexWrap: 'wrap',flexDirection: 'row', marginTop: 30, textAlign: 'center', fontSize: 25, fontWeight: 'bold'}} > {arDate} </Text>
      </View>
    </View>
  );
};


export default CalanderScreen;