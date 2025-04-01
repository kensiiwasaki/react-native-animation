import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { LayoutGrid } from 'lucide-react-native';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack>
        <Stack.Screen 
          name="heart" 
          options={{ 
            headerRight: () => (
              <Link href="/" asChild>
                <Pressable style={styles.headerButton}>
                  <LayoutGrid size={24} color="#000" />
                </Pressable>
              </Link>
            ),
          }} 
        />
        <Stack.Screen 
          name="scale" 
          options={{ 
            title: 'スケールアニメーション',
            headerRight: () => (
              <Link href="/" asChild>
                <Pressable style={styles.headerButton}>
                  <LayoutGrid size={24} color="#000" />
                </Pressable>
              </Link>
            ),
          }} 
        />
        <Stack.Screen 
          name="drawer" 
          options={{ 
            title: 'ドロワーアニメーション',
            headerRight: () => (
              <Link href="/" asChild>
                <Pressable style={styles.headerButton}>
                  <LayoutGrid size={24} color="#000" />
                </Pressable>
              </Link>
            ),
          }} 
        />
        <Stack.Screen 
          name="confetti" 
          options={{ 
            title: 'クラッカーアニメーション',
            headerRight: () => (
              <Link href="/" asChild>
                <Pressable style={styles.headerButton}>
                  <LayoutGrid size={24} color="#000" />
                </Pressable>
              </Link>
            ),
          }} 
        />
        <Stack.Screen 
          name="carousel" 
          options={{ 
            title: 'カードカルーセル',
            headerRight: () => (
              <Link href="/" asChild>
                <Pressable style={styles.headerButton}>
                  <LayoutGrid size={24} color="#000" />
                </Pressable>
              </Link>
            ),
          }} 
        />
        <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    marginRight: 15,
    padding: 8,
  },
});