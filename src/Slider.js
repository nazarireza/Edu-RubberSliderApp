import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SliderIndicator from './SliderIndicator';

import {
  CANVAS_HEIGHT,
  LEFT_INDICATOR_INITIAL_X,
  RIGHT_INDICATOR_INITIAL_X,
  INDICATOR_SIZE,
} from './Constants.js';
import { useValues } from 'react-native-redash';
import { State } from 'react-native-gesture-handler';
import Svg from 'react-native-svg';
import SliderLine from './SliderLine';
import { add } from 'react-native-reanimated';

const MIDDLE_OF_CONTAINER_Y = CANVAS_HEIGHT / 2 - INDICATOR_SIZE / 2;

export default () => {
  const [containerLayout, setContainerLayout] = useState({
    width: 0,
    height: 0,
  });
  const [
    leftIndicatorX,
    leftIndicatorY,
    leftIndicatorState,
    rightIndicatorX,
    rightIndicatorY,
    rightIndicatorState,
  ] = useValues(
    LEFT_INDICATOR_INITIAL_X,
    CANVAS_HEIGHT / 2 - INDICATOR_SIZE / 2,
    State.UNDETERMINED,
    RIGHT_INDICATOR_INITIAL_X,
    CANVAS_HEIGHT / 2 - INDICATOR_SIZE / 2,
    State.UNDETERMINED
  );
  return (
    <View
      style={styles.container}
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => {
        setContainerLayout({ width, height });
      }}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${containerLayout.width} ${containerLayout.height}`}
      >
        <SliderLine
          startX={0}
          startY={MIDDLE_OF_CONTAINER_Y + INDICATOR_SIZE / 2}
          endX={add(leftIndicatorX, INDICATOR_SIZE / 2)}
          endY={add(leftIndicatorY, INDICATOR_SIZE / 2)}
        />
        <SliderLine
          startX={add(leftIndicatorX, INDICATOR_SIZE / 2)}
          startY={add(leftIndicatorY, INDICATOR_SIZE / 2)}
          endX={add(rightIndicatorX, INDICATOR_SIZE / 2)}
          endY={add(rightIndicatorY, INDICATOR_SIZE / 2)}
          color="#495fde"
          strokeWidth={3}
        />
        <SliderLine
          startX={add(rightIndicatorX, INDICATOR_SIZE / 2)}
          startY={add(rightIndicatorY, INDICATOR_SIZE / 2)}
          endX={containerLayout.width - INDICATOR_SIZE / 2}
          endY={MIDDLE_OF_CONTAINER_Y + INDICATOR_SIZE / 2}
        />
      </Svg>
      <SliderIndicator
        initialX={LEFT_INDICATOR_INITIAL_X}
        x={leftIndicatorX}
        y={leftIndicatorY}
        state={leftIndicatorState}
        minX={-INDICATOR_SIZE / 2}
        maxX={containerLayout.width - INDICATOR_SIZE / 2 - INDICATOR_SIZE}
        minY={-INDICATOR_SIZE / 2}
        maxY={containerLayout.height - INDICATOR_SIZE / 2}
      />
      <SliderIndicator
        initialX={RIGHT_INDICATOR_INITIAL_X}
        x={rightIndicatorX}
        y={rightIndicatorY}
        state={rightIndicatorState}
        minX={INDICATOR_SIZE / 2}
        maxX={containerLayout.width - INDICATOR_SIZE / 2}
        minY={-INDICATOR_SIZE / 2}
        maxY={containerLayout.height - INDICATOR_SIZE / 2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: CANVAS_HEIGHT,
  },
});
