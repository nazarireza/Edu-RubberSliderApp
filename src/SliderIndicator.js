import React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { onGestureEvent, useValues, timing } from 'react-native-redash';

import { INDICATOR_SIZE, CANVAS_HEIGHT } from './Constants.js';
import Animated, {
  useCode,
  block,
  cond,
  eq,
  max,
  min,
  set,
  add,
  Easing,
} from 'react-native-reanimated';

const MIDDLE_OF_CONTAINER_Y = CANVAS_HEIGHT / 2 - INDICATOR_SIZE / 2;

export default ({ initialX, x, y, state, minX, maxX, minY, maxY }) => {
  const [translationX, translationY, lastTranslateX] = useValues(
    0,
    0,
    initialX
  );
  useCode(() => {
    return block([
      cond(
        eq(state, State.ACTIVE),
        [
          set(x, max(minX, min(add(lastTranslateX, translationX), maxX))),
          set(
            y,
            max(minY, min(add(translationY, MIDDLE_OF_CONTAINER_Y), maxY))
          ),
        ],
        cond(eq(state, State.END), [
          set(lastTranslateX, x),
          set(
            y,
            timing({
              from: translationY,
              to: MIDDLE_OF_CONTAINER_Y,
              duration: 350,
              easing: Easing.elastic(3)
            })
          ),
        ])
      ),
    ]);
  }, [maxX]);
  return (
    <PanGestureHandler
      {...onGestureEvent({ translationX, translationY, state })}
    >
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ translateX: x }, { translateY: y }],
          },
        ]}
      />
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderWidth: 2,
    borderRadius: INDICATOR_SIZE / 2,
    borderColor: '#495fde',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
});
