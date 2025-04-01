import { Tabs } from 'expo-router';
import { LayoutGrid as Layout } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#eee',
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'アニメーション一覧',
          tabBarIcon: ({ size, color }) => (
            <Layout size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}