import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Platform } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const CARD_HEIGHT = CARD_WIDTH * 1.4;
const SPACING = 20;
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 200,
  mass: 1,
};

const cards = [
  {
    id: 1,
    title: 'Mountain Lake',
    description: '静かな山の湖で心を癒す',
    image: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Desert Sunset',
    description: '砂漠に沈む夕日の絶景',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Ocean Waves',
    description: '青い海と白い波の調和',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Forest Path',
    description: '緑豊かな森の小道を歩く',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Northern Lights',
    description: '夜空を彩るオーロラの輝き',
    image: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Cherry Blossoms',
    description: '春の訪れを告げる桜の花',
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&auto=format&fit=crop',
  },
];

function Card({ index, card, x }: { index: number; card: typeof cards[0]; x: Animated.SharedValue<number> }) {
  const animatedStyle = useAnimatedStyle(() => {
    const position = -index * (CARD_WIDTH + SPACING);
    const inputRange = [
      position - (CARD_WIDTH + SPACING),
      position,
      position + (CARD_WIDTH + SPACING),
    ];

    const scale = interpolate(
      x.value,
      inputRange,
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      x.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      x.value,
      inputRange,
      [40, 0, 40],
      Extrapolate.CLAMP
    );

    const rotateZ = interpolate(
      x.value,
      inputRange,
      [8, 0, -8],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: x.value - position },
        { scale },
        { translateY },
        { rotateZ: `${rotateZ}deg` },
      ],
      opacity,
      zIndex: scale === 1 ? 1 : 0,
    };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Image 
        source={{ uri: card.image }} 
        style={styles.image}
        loading="eager"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.description}>{card.description}</Text>
      </View>
      <View style={styles.overlay} />
    </Animated.View>
  );
}

function Pagination({ currentIndex }: { currentIndex: number }) {
  return (
    <View style={styles.pagination}>
      {cards.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            currentIndex === index && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );
}

export default function CarouselDemo() {
  const x = useSharedValue(0);
  const context = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const updateIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const maxScroll = -(cards.length - 1) * (CARD_WIDTH + SPACING);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = x.value;
    })
    .onUpdate((event) => {
      const newValue = context.value + event.translationX;
      x.value = Math.min(Math.max(newValue, maxScroll), 0);
    })
    .onEnd((event) => {
      const velocity = event.velocityX;
      const cardIndex = Math.round(-x.value / (CARD_WIDTH + SPACING));
      const clampedIndex = Math.min(Math.max(cardIndex, 0), cards.length - 1);
      
      x.value = withSpring(
        -(clampedIndex * (CARD_WIDTH + SPACING)),
        {
          ...SPRING_CONFIG,
          velocity: velocity,
        }
      );

      runOnJS(updateIndex)(clampedIndex);
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.carouselContainer}>
        <GestureDetector gesture={gesture}>
          <View style={styles.cardsContainer}>
            {cards.map((card, index) => (
              <Card key={card.id} index={index} card={card} x={x} />
            ))}
          </View>
        </GestureDetector>
      </View>
      <Pagination currentIndex={currentIndex} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    width: SCREEN_WIDTH,
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    backgroundColor: '#fff',
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        elevation: 8,
      },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING,
    paddingBottom: SPACING * 1.5,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#007AFF',
    transform: [{ scale: 1.2 }],
  },
});