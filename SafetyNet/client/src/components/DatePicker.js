import React, { useState } from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import { getStyle, colors } from '../css/Styles';
import { daysOfWeek, sameDay } from '../utils';
import Modal from 'react-native-modal';
import Separator from './Separator';
import DateRange from './DateRange';
import Button from './Button';

const Calendar = ({ date, setDate, disablePast }) => {
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const month_dates = [...Array(lastDate.getDate()).keys()].map(
      (i) => new Date(date.getFullYear(), date.getMonth(), i + 1),
  );

  const last_month_dates = [];
  const next_month_dates = [];
  for (let i = 1; i <= firstDate.getDay(); i++) {
    const newDate = new Date(
        firstDate.getFullYear(),
        firstDate.getMonth(),
        firstDate.getDate() - i,
    );
    last_month_dates.push(newDate);
  }
  for (let i = 1; i < 7 - lastDate.getDay(); i++) {
    const newDate = new Date(
        firstDate.getFullYear(),
        firstDate.getMonth(),
        lastDate.getDate() + i,
    );
    next_month_dates.push(newDate);
  }

  const nRows = 6;
  const dates = last_month_dates
      .reverse()
      .concat(month_dates)
      .concat(next_month_dates);

  const inPast = (date) =>
    disablePast && (!date || (date < new Date() && !sameDay(date, new Date())));

  return (
    <View style={getStyle('width-100p')}>
      <View style={getStyle('flex-direction-row justify-content-center')}>
        {daysOfWeek.map((d) => (
          <View
            key={d}
            style={getStyle(
                'width-14p align-items-center justify-content-center height-25',
            )}>
            <Text style={getStyle('font-size-11 messina-sans-bold')}>
              {d.toUpperCase().slice(0, 3)}
            </Text>
          </View>
        ))}
      </View>
      <Separator height={6} />
      {[...Array(nRows).keys()].map((i) => (
        <View
          key={i}
          style={getStyle('flex-direction-row justify-content-center')}>
          {daysOfWeek.map((d, j) => {
            const curr = dates[7 * i + j];

            return (
              <Pressable
                onPress={() => setDate(curr)}
                key={`${d}_${i}`}
                disabled={inPast(curr)}
                style={getStyle('width-42 align-items-center justify-content-center height-40')}>
                <View
                  style={getStyle(
                      'width-30 height-30 align-items-center justify-content-center',
                      {
                        borderRadius: 15,
                        backgroundColor: sameDay(curr, date) ? colors.deepSupport : undefined,
                      },
                  )}>
                  <Text
                    style={getStyle('font-size-16', {
                      fontFamily: sameDay(curr, date) ? 'MessinaSans-Bold' : 'MessinaSans-SemiBold',
                      color: inPast(curr) || sameDay(curr, date) ?
                        'white' :
                        '#999999',
                    })}>
                    {curr?.getDate()}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const DatePicker = ({ open, setOpen, date, setDate, disablePast }) => {
  const [tempDate, setTempDate] = useState(date);

  return (
    <Modal
      isVisible={open}
      backdropColor={colors.bgNavy1000}
      backdropOpacity={0.8}
      transparent
      onBackdropPress={() => {
        setOpen(false);
      }}>
      <View
        style={getStyle(
            'width-100p height-56p white padding-6p border-radius-10',
        )}>
        <View style={getStyle('width-100p align-items-flex-end', { marginTop: -10, marginRight: -10 })}>
          <Pressable
            style={getStyle('justify-content-center width-50 height-50 align-items-flex-end')}
            onPress={() => setOpen(false)}>
            <Image source={require('../../res/images/closeIcon.png')} />
          </Pressable>
        </View>
        <DateRange disablePast={disablePast} date={tempDate} setDate={setTempDate} />
        <Separator height={3} />
        <Calendar
          disablePast={disablePast}
          date={tempDate}
          setDate={setTempDate}
        />
        <Button
          text="Select date"
          textStyle={getStyle('messina-sans-bold font-size-16 text-white')}
          buttonStyle={getStyle('width-100p height-50 border-radius-100 margin-bottom-20 deepSupport')}
          onPress={() => {
            setDate(tempDate);
            setOpen(false);
          }}
        />
      </View>
    </Modal>
  );
};

export default DatePicker;
