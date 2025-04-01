import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Heart, ChevronRight, Maximize2, PanelBottom, PartyPopper, Images } from 'lucide-react-native';

type DemoItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
};

const demos: DemoItem[] = [
  {
    icon: <Heart size={24} />,
    title: 'ハートアニメーション',
    description: 'インスタグラムのような、ダブルタップでハートが表示されるアニメーション',
    href: '/heart',
  },
  {
    icon: <Maximize2 size={24} />,
    title: 'スケールアニメーション',
    description: 'アイコンをタップすると、ふわっと拡大されるアニメーション',
    href: '/scale',
  },
  {
    icon: <PanelBottom size={24} />,
    title: 'ドロワーアニメーション',
    description: 'ボタンをタップすると、下からぬるっとドロワーが表示されるアニメーション',
    href: '/drawer',
  },
  {
    icon: <PartyPopper size={24} />,
    title: 'クラッカーアニメーション',
    description: 'ボタンをタップすると、クラッカーが弾けて紙吹雪が舞うアニメーション',
    href: '/confetti',
  },
  {
    icon: <Images size={24} />,
    title: 'カードカルーセル',
    description: '美しい画像カードをスワイプで切り替えるアニメーション',
    href: '/carousel',
  },
];

export default function AnimationList() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>アニメーションデモ</Text>
      {demos.map((demo, index) => (
        <Link href={demo.href} key={index} asChild>
          <Pressable style={styles.demoItem}>
            <View style={styles.demoContent}>
              <View style={styles.iconContainer}>
                {demo.icon}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{demo.title}</Text>
                <Text style={styles.description}>{demo.description}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#666" />
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  demoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  demoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});