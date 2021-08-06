// import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

// import { Home } from './screens';

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     border: 'transparent',
//   },
// };

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer theme={theme}>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}
//         >
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Svg, {Path, Text, G} from 'react-native-svg';

const colors = [
  '#0d47a1',
  '#1976D2',
  '#2196F3',
  '#64B5F6',
  '#BBDEFB',
  '#E3F2FD',
];

const getXY = (percent: number, radius: number) => {
  const x = Math.cos((2 * Math.PI * percent) / 100) * radius;
  const y = Math.sin((2 * Math.PI * percent) / 100) * radius;
  return {x, y};
};

const slices = [
  {percent: 21, id: 1},
  {percent: 66, id: 2},
  {percent: 5, id: 3},
  {percent: 17, id: 4},
].sort((a, b) => b.percent - a.percent);

const App = () => {
  const radius = 100;
  let tempPercent = 0;
  let tempTextPercent = 0;
  let prevMiddlePercent = 0;

  const pathDataList = slices.map((v) => {
    const start = getXY(tempPercent, radius);
    tempPercent += v.percent;
    const end = getXY(tempPercent, radius);
    const largeArcFlag = v.percent > 50 ? 1 : 0;
    tempTextPercent += prevMiddlePercent + v.percent / 2;
    prevMiddlePercent = v.percent / 2;
    return {
      d: `M ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
      L 0 0`,
      id: v.id,
      textPos: {
        x: getXY(tempTextPercent, radius / 2).x,
        y: getXY(tempTextPercent, radius / 2).y,
      },
      percent: v.percent,
    };
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Svg
        viewBox="-100 -50 200 200"
        style={{
          transform: [{rotateZ: '-90deg'}],
        }}>
        {pathDataList.map((v, i) => (
          <G key={v.id}>
            <Path d={v.d} fill={colors[i]} />
            <Text
              x={v.textPos.x}
              y={v.textPos.y}
              fill="#fff"
              fontSize="16"
              textAnchor="middle"
              transform={`rotate(90 ${v.textPos.x},${v.textPos.y})`}>
              {v.percent}
            </Text>
          </G>
        ))}
      </Svg>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
});

export default App;