import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockCourses = [
  { id: '1', name: 'Vuelo Básico', code: 'FB-101', credits: 4, status: 'active' },
  { id: '2', name: 'Navegación Aérea', code: 'NA-201', credits: 3, status: 'active' },
  { id: '3', name: 'Meteorología', code: 'MT-101', credits: 3, status: 'completed' },
];

export default function CoursesScreen() {
  const renderCourse = ({ item }: { item: typeof mockCourses[0] }) => (
    <View style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseCode}>{item.code}</Text>
        <View style={[styles.statusBadge, item.status === 'active' ? styles.activeBadge : styles.completedBadge]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.courseName}>{item.name}</Text>
      <Text style={styles.credits}>{item.credits} créditos</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockCourses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No hay cursos inscritos</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  activeBadge: {
    backgroundColor: '#dcfce7',
  },
  completedBadge: {
    backgroundColor: '#e0e7ff',
  },
  statusText: {
    fontSize: 12,
    color: '#374151',
  },
  courseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  credits: {
    fontSize: 14,
    color: '#666',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
  },
});