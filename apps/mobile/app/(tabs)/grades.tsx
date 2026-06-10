import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockGrades = [
  { id: '1', courseName: 'Vuelo Básico', grade: 85, letterGrade: 'B', period: '2024-1' },
  { id: '2', courseName: 'Navegación Aérea', grade: 92, letterGrade: 'A', period: '2024-1' },
  { id: '3', courseName: 'Meteorología', grade: 78, letterGrade: 'C', period: '2024-1' },
];

export default function GradesScreen() {
  const average = mockGrades.reduce((acc, g) => acc + g.grade, 0) / mockGrades.length;

  const getGradeColor = (grade: number) => {
    if (grade >= 80) return '#22c55e';
    if (grade >= 60) return '#eab308';
    return '#ef4444';
  };

  const renderGrade = ({ item }: { item: typeof mockGrades[0] }) => (
    <View style={styles.gradeCard}>
      <View style={styles.gradeHeader}>
        <Text style={styles.courseName}>{item.courseName}</Text>
        <View style={[styles.gradeCircle, { backgroundColor: getGradeColor(item.grade) }]}>
          <Text style={styles.gradeText}>{item.grade}</Text>
        </View>
      </View>
      <View style={styles.gradeDetails}>
        <Text style={styles.letterGrade}>Letra: {item.letterGrade}</Text>
        <Text style={styles.period}>Período: {item.period}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Promedio General</Text>
        <Text style={styles.summaryValue}>{average.toFixed(1)}</Text>
        <Text style={styles.summaryCourses}>{mockGrades.length} cursos completados</Text>
      </View>
      <FlatList
        data={mockGrades}
        renderItem={renderGrade}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No hay calificaciones</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  summaryCard: {
    backgroundColor: '#3b82f6',
    margin: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  summaryCourses: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  gradeCard: {
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
  gradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  gradeCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gradeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  letterGrade: {
    fontSize: 14,
    color: '#666',
  },
  period: {
    fontSize: 14,
    color: '#666',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
  },
});