import React from 'react';
import {PieChart} from 'react-native-svg-charts';
import {Text as TXT} from 'react-native-svg';
import {randomColor} from '../utils/colors';

export default function PieChartDefault({chartStyle, arrayItems}) {
  const Labels = ({slices}) => {
    return slices.map((slice, index) => {
      const {pieCentroid, data} = slice;

      return (
        <TXT
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'black'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={24}
          stroke={'black'}
          strokeWidth={1}>
          {data.value}
        </TXT>
      );
    });
  };

  const pieData = arrayItems
    .filter((item) => item.value > 0)
    .map((item) => ({
      label: item.label,
      value: item.value,
      svg: {
        fill: randomColor(),
        onPress: () => item.onPress(),
      },
      key: item.key,
    }));

  return (
    <PieChart style={chartStyle} data={pieData} spacing={0} outerRadius={'95%'}>
      <Labels />
    </PieChart>
  );
}
