import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import Slider from './Slider';
import { useValues, ReText } from 'react-native-redash';
import { concat, sub } from 'react-native-reanimated';

export default () => {
  const [start, end] = useValues(0, 0);
  const selectedRangeText = concat('$', start, ' - $', end);
  const currentRangeText = concat('Current Range: $', sub(end, start));
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.canvasContainer}>
          <Text style={styles.titleText}>Price Range</Text>
          <ReText style={styles.valueRangeText} text={selectedRangeText} />
          <ReText style={styles.currentValueText} text={currentRangeText} />
          <Slider {...{ start, end }} max={500} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cfd9ed',
  },
  canvasContainer: {
    backgroundColor: '#FFFFFF',
    width: 350,
    borderRadius: 8,
    paddingHorizontal: 35,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '3rgba(0,0,0,.7)',
  },
  valueRangeText: {
    color: '#495fde',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
  },
  currentValueText: {
    color: 'rgba(0,0,0,.4)',
    marginVertical: 10,
  },
});
