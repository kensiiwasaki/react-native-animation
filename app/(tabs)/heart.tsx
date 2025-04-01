import { StyleSheet, View, Image } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';

const DOUBLE_TAP_DELAY = 300;
const HEART_SIZE = 100;
const HEART_COLOR = '#ff4d79';

export default function DoubleTapDemo() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const showAnimation = (x: number, y: number) => {
    translateX.value = x - HEART_SIZE / 2;
    translateY.value = y - HEART_SIZE / 2;
    
    scale.value = withSequence(
      withSpring(1, { damping: 15, stiffness: 200 }),
      withDelay(
        500,
        withSpring(0, { damping: 15, stiffness: 200 })
      )
    );
    opacity.value = withSequence(
      withSpring(1),
      withDelay(500, withSpring(0))
    );
  };

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(DOUBLE_TAP_DELAY)
    .onStart((event) => {
      runOnJS(showAnimation)(event.x, event.y);
    });

  const heartStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={doubleTapGesture}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop' }}
            style={styles.image}
          />
          <Animated.View style={[styles.heartContainer, heartStyle]}>
            <Heart size={HEART_SIZE} fill={HEART_COLOR} color={HEART_COLOR} />
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartContainer: {
    position: 'absolute',
    zIndex: 1,
  },
});