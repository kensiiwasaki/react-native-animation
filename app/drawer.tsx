import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { ChevronUp, Settings, User, Bell } from 'lucide-react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.5;

export default function DrawerDemo() {
  const translateY = useSharedValue(DRAWER_HEIGHT);
  const context = useSharedValue(0);

  const scrollTo = (destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, {
      damping: 20,
      stiffness: 100,
    });
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateY.value;
    })
    .onUpdate((event) => {
      translateY.value = Math.max(
        Math.min(context.value + event.translationY, DRAWER_HEIGHT),
        0
      );
    })
    .onEnd((event) => {
      const velocity = event.velocityY;
      const shouldClose = velocity > 20 || (velocity >= 0 && translateY.value > DRAWER_HEIGHT / 2);
      scrollTo(shouldClose ? DRAWER_HEIGHT : 0);
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const toggleDrawer = () => {
    const isOpen = translateY.value === 0;
    scrollTo(isOpen ? DRAWER_HEIGHT : 0);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={toggleDrawer}>
        <Text style={styles.buttonText}>ドロワーを開く</Text>
      </Pressable>

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.drawer, rBottomSheetStyle]}>
          <View style={styles.drawerHeader}>
            <View style={styles.drawerPill} />
            <ChevronUp size={24} color="#666" />
          </View>
          
          <View style={styles.drawerContent}>
            <Pressable style={styles.drawerItem}>
              <User size={24} color="#333" />
              <Text style={styles.drawerItemText}>プロフィール</Text>
            </Pressable>
            
            <Pressable style={styles.drawerItem}>
              <Bell size={24} color="#333" />
              <Text style={styles.drawerItemText}>通知</Text>
            </Pressable>
            
            <Pressable style={styles.drawerItem}>
              <Settings size={24} color="#333" />
              <Text style={styles.drawerItemText}>設定</Text>
            </Pressable>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: DRAWER_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  drawerHeader: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  drawerPill: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    marginBottom: 8,
  },
  drawerContent: {
    padding: 24,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  drawerItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
});