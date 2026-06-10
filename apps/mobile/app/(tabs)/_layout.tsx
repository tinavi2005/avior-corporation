import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Home, BookOpen, GraduationCap, User } from 'lucide-react-native';
import { colors } from '../../lib/colors';

function TabBarIcon(props: { name: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    home: <Home size={24} />,
    courses: <BookOpen size={24} />,
    grades: <GraduationCap size={24} />,
    profile: <User size={24} />,
  };
  return icons[props.name] || null;
}

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? colors.cardDark : colors.card,
          borderTopColor: colorScheme === 'dark' ? colors.borderDark : colors.border,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? colors.cardDark : colors.card,
        },
        headerTintColor: colorScheme === 'dark' ? colors.textDark : colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitle: 'Vale Integrador',
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Cursos',
          tabBarIcon: ({ color }) => <TabBarIcon name="courses" color={color} />,
          headerTitle: 'Mis Cursos',
        }}
      />
      <Tabs.Screen
        name="grades"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color }) => <TabBarIcon name="grades" color={color} />,
          headerTitle: 'Mis Calificaciones',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name="profile" color={color} />,
          headerTitle: 'Mi Perfil',
        }}
      />
    </Tabs>
  );
}