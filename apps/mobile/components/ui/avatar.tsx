import * as React from 'react';
import { View, Text } from 'react-native';

interface AvatarProps {
  style?: any;
  children: React.ReactNode;
}

export function Avatar({ style, children }: AvatarProps) {
  return (
    <View
      style={[
        {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#e5e5e5',
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function AvatarFallbackText({ children }: { children: string }) {
  return (
    <Text style={{ fontSize: 16, fontWeight: '600', color: '#666' }}>
      {children}
    </Text>
  );
}