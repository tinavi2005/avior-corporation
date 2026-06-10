import { View, Text, StyleSheet } from 'react-native';
import { Avatar, AvatarFallbackText } from '../../components/ui/avatar';

const mockProfile = {
  firstName: 'Juan',
  lastName: 'Pérez',
  email: 'juan.perez@test.com',
  documentId: '12345678',
  role: 'student',
};

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar style={styles.avatar}>
          <AvatarFallbackText>
            {mockProfile.firstName[0]}{mockProfile.lastName[0]}
          </AvatarFallbackText>
        </Avatar>
        <Text style={styles.name}>{mockProfile.firstName} {mockProfile.lastName}</Text>
        <Text style={styles.role}>{mockProfile.role}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{mockProfile.email}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.label}>Documento</Text>
          <Text style={styles.value}>{mockProfile.documentId}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3b82f6',
    padding: 32,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    textTransform: 'capitalize',
  },
  info: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    paddingVertical: 12,
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e5e5',
  },
});