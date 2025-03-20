import React, { useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg, { Circle } from 'react-native-svg';
import colors from '../../utils/colors';

export default function CircularButton({ onPress }) {
  const spinValue = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      onPress?.();
    });
  };

  const rotation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const radius = 70;
  const circumference = 2 * Math.PI * radius; // ~ 439.82
  const gapAngle = 75;
  const gapFraction = gapAngle / 360;        
  const gapLength = gapFraction * circumference;  // ~ 42.7
  const arcLength = circumference - gapLength;    // ~ 397.1

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <View style={styles.container}>

          {/* Anillo exterior en un contenedor ANIMADO para que gire */}
          <Animated.View
            style={[
              styles.svgContainer,
              { transform: [{ rotate: rotation }] },
            ]}
          >
            {/* Dibujamos el círculo parcial con SVG */}
            <Svg width={150} height={150}>
              <Circle
                cx={75}           // Centro en x
                cy={75}           // Centro en y
                r={70}            // Radio
                stroke={colors.PRIMARY}   
                strokeWidth={5}
                fill="none"    
                strokeDasharray={[arcLength, gapLength]}
              />
            </Svg>
          </Animated.View>

          {/* Capa intermedia (opcional) */}
          <View style={styles.midRing}>
            {/* Círculo interior (botón “real”) */}
            <View style={styles.innerCircle}>
              <Icon name="chevron-forward-outline" style={styles.icon}/>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BG,
  },
  container: {
    width: 150,
    height: 150,
    // Opcional: para superponer el “midRing” sobre el SVG
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    // El contenedor animado del anillo exterior
    ...StyleSheet.absoluteFillObject, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  midRing: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: colors.BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: colors.BG,
    fontSize: 30,
  },
});
