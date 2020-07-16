import React from 'react';
import { StyleSheet, View } from 'react-native';

import { INDICATOR_SIZE } from './Constants.js';

export default () => {
  return <View style={[styles.indicator]} />;
};

const styles = StyleSheet.create({
  indicator: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderWidth: 2,
    borderRadius: INDICATOR_SIZE / 2,
    borderColor: '#495fde',
    ...StyleSheet.absoluteFillObject,
  },
});
