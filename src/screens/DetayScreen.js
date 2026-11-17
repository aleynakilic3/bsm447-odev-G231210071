import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetayScreen({ route }) {
  const { kisi } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {kisi.name.first} {kisi.name.last}
      </Text>
      <Text>Şehir: {kisi.location.city}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
});