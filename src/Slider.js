import React from 'react';
import { StyleSheet, View } from 'react-native';

import { CANVAS_HEIGHT } from './Constants.js';

export default () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    height: CANVAS_HEIGHT,
  },
});
