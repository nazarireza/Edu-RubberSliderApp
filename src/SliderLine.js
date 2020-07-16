import React, { useState } from 'react';
import { Path } from 'react-native-svg';
import {
  useCode,
  block,
  set,
  concat,
  call,
  onChange,
  divide,
  add,
  sub,
} from 'react-native-reanimated';
import { useValue } from 'react-native-redash';
import { CANVAS_ZOOM_RATE, INDICATOR_SIZE } from './Constants';

export default ({
  startX,
  startY,
  endX,
  endY,
  strokeWidth = 2,
  color = 'rgba(0,0,0,.3)',
}) => {
  const [d, setD] = useState('');
  const animatedD = useValue('');

  const firstControllerX = add(startX, divide(sub(endX, startX), 2));
  const secondControllerX = sub(endX, divide(sub(endX, startX), 2));

  useCode(() => {
    return block([
      set(
        animatedD,
        concat(
          'M ',
          startX,
          ' ',
          startY,
          ' C ',
          firstControllerX,
          ' ',
          startY,
          ' ',
          secondControllerX,
          ' ',
          endY,
          ' ',
          endX,
          ' ',
          endY,
          ' '
        )
      ),
      onChange(
        animatedD,
        call([animatedD], ([ad]) => setD(ad))
      ),
    ]);
  }, [startX, startY, endX, endY]);
  return (
    <Path {...{ d }} strokeWidth={strokeWidth} stroke={color} fillOpacity={0} />
  );
};
