import React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {
  onGestureEvent,
  useValues,
  timing,
  useClock,
} from 'react-native-redash';

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
  clockRunning,
  color,
} from 'react-native-reanimated';

const MIDDLE_OF_CONTAINER_Y = CANVAS_HEIGHT / 2 - INDICATOR_SIZE / 2;
const NORMAL_COLOR = color(255, 255, 255, 1);
const PRIMARY_COLOR = color(207, 217, 237, 1);

export default ({ initialX, x, y, state, minX, maxX, minY, maxY }) => {
  const [
    translationX,
    translationY,
    lastTranslateX,
    backgroundColor,
  ] = useValues(0, 0, initialX, 0);
  const transitionYClock = useClock();
  useCode(() => {
    return block([
      cond(eq(backgroundColor, 0), set(backgroundColor, NORMAL_COLOR)),
      cond(
        eq(state, State.ACTIVE),
        [
          set(backgroundColor, PRIMARY_COLOR),
          set(x, max(minX, min(add(lastTranslateX, translationX), maxX))),
          set(
            y,
            max(minY, min(add(translationY, MIDDLE_OF_CONTAINER_Y), maxY))
          ),
        ],
        cond(
          eq(state, State.END),
          [
            set(backgroundColor, NORMAL_COLOR),
            set(
              y,
              timing({
                clock: transitionYClock,
                from: y,
                to: MIDDLE_OF_CONTAINER_Y,
                duration: 350,
                easing: Easing.elastic(3),
              })
            ),
            cond(
              eq(clockRunning(transitionYClock), 0),
              set(state, State.UNDETERMINED)
            ),
          ],
          set(lastTranslateX, x)
        )
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
            backgroundColor,
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
  },
});
