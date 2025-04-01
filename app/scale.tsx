import { StyleSheet, View, Pressable } from 'react-native';
import { Camera, Music2, Send } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ICON_SIZE = 32;

export default function ScaleDemo() {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(1.4, { damping: 4, stiffness: 300 }),
      withSpring(1, { damping: 15, stiffness: 300 })
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.iconGrid}>
        <AnimatedPressable
          style={[styles.iconButton, animatedStyle]}
          onPress={handlePress}>
          <Camera size={ICON_SIZE} color="#FF6B6B" />
        </AnimatedPressable>
        <AnimatedPressable
          style={[styles.iconButton, animatedStyle]}
          onPress={handlePress}>
          <Music2 size={ICON_SIZE} color="#4ECDC4" />
        </AnimatedPressable>
        <AnimatedPressable
          style={[styles.iconButton, animatedStyle]}
          onPress={handlePress}>
          <Send size={ICON_SIZE} color="#45B7D1" />
        </AnimatedPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  iconGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconButton: {
    width: 80,
    height: 80,
    backgroundColor: '#f8f9fa',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});