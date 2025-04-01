import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CONFETTI_COUNT = 50;
const COLORS = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];
const INITIAL_VELOCITY = -SCREEN_HEIGHT * 0.3;
const GRAVITY = 980;

type Confetti = {
  id: number;
  x: number;
  delay: number;
  color: string;
  rotateZ: number;
  translateX: number;
};

function generateConfetti(): Confetti[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
    id: i,
    x: SCREEN_WIDTH * 0.5 + (Math.random() - 0.5) * 200,
    delay: Math.random() * 300,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotateZ: Math.random() * 360,
    translateX: (Math.random() - 0.5) * SCREEN_WIDTH * 0.8,
  }));
}

function ConfettiPiece({ confetti }: { confetti: Confetti }) {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0);
  const rotation = useSharedValue(confetti.rotateZ);

  React.useEffect(() => {
    const duration = 2000;
    
    // Reset values
    translateY.value = 0;
    translateX.value = 0;
    opacity.value = 1;
    scale.value = 0;
    rotation.value = confetti.rotateZ;

    // Start animations
    scale.value = withDelay(
      confetti.delay,
      withSpring(1, { damping: 5 })
    );

    translateY.value = withDelay(
      confetti.delay,
      withSequence(
        withSpring(INITIAL_VELOCITY, { 
          damping: 10,
          stiffness: 100 
        }),
        withTiming(SCREEN_HEIGHT, {
          duration: duration * 0.7,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      )
    );

    translateX.value = withDelay(
      confetti.delay,
      withTiming(confetti.translateX, {
        duration: duration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    );

    rotation.value = withDelay(
      confetti.delay,
      withSequence(
        withTiming(confetti.rotateZ + 180, {
          duration: duration * 0.5,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        withTiming(confetti.rotateZ + 360, {
          duration: duration * 0.5,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      )
    );

    opacity.value = withDelay(
      duration - 200,
      withTiming(0, { duration: 200 })
    );
  }, [confetti.delay, confetti.rotateZ, confetti.translateX]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotateZ: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: confetti.x,
          width: 8,
          height: 16,
          backgroundColor: confetti.color,
          borderRadius: 4,
        },
        style,
      ]}
    />
  );
}

export default function ConfettiDemo() {
  const [confettiList, setConfettiList] = useState<Confetti[]>([]);

  const handlePress = useCallback(() => {
    setConfettiList(generateConfetti());
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.content}>
        <Pressable 
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]} 
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>クラッカーを鳴らす！</Text>
        </Pressable>

        {confettiList.map((conf) => (
          <ConfettiPiece key={conf.id} confetti={conf} />
        ))}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    transform: [{ scale: 1 }],
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});