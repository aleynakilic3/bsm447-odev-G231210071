import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ListeScreen({ navigation }) {
  // Detay ekranına parametre aktarımını test etmek için örnek veri
  const ornekKisi = { name: { first: 'Ahmad', last: 'Lucky' }, location: { city: 'Sakarya' } };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kişi Rehberi - Liste</Text>
      <Button
        title="Örnek Detaya Git"
        onPress={() => navigation.navigate('Detay', { kisi: ornekKisi })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, marginBottom: 12 },
});