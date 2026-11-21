import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { kayitliKisileriGetir } from '../utils/storage';

export default function KaydedilenlerScreen({ navigation }) {
  const [kayitliKisiler, setKayitliKisiler] = useState([]);

  // Sekmeye her odaklanıldığında güncel kayıtları AsyncStorage'dan çek
  useFocusEffect(
    useCallback(() => {
      const verileriYukle = async () => {
        const veriler = await kayitliKisileriGetir();
        setKayitliKisiler(veriler);
      };
      verileriYukle();
    }, [])
  );

  const kisiSatiriCiz = ({ item }) => (
    <TouchableOpacity
      style={styles.kart}
      onPress={() => navigation.navigate('Detay', { kisi: item })}
    >
      <Image source={{ uri: item.picture.thumbnail }} style={styles.avatar} />
      <View style={styles.bilgiAlani}>
        <Text style={styles.adSoyad}>
          {item.name.first} {item.name.last}
        </Text>
        <Text style={styles.sehir}>{item.location.city}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  if (kayitliKisiler.length === 0) {
    return (
      <View style={styles.bosMerkez}>
        <Ionicons name="bookmark-outline" size={56} color="#B0B5BD" />
        <Text style={styles.bosBaslik}>Henüz kaydedilmiş kişi yok</Text>
        <Text style={styles.bosAltMetin}>
          Kişiler sekmesinden bir kayda girip "Kaydet" düğmesine basabilirsiniz.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={kayitliKisiler}
        keyExtractor={(item) => item.login.uuid}
        renderItem={kisiSatiriCiz}
        contentContainerStyle={styles.listeIcerik}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  listeIcerik: {
    paddingBottom: 20,
  },
  kart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  bilgiAlani: {
    flex: 1,
  },
  adSoyad: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  sehir: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  bosMerkez: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#F5F6F8',
  },
  bosBaslik: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginTop: 12,
    marginBottom: 6,
  },
  bosAltMetin: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 20,
  },
});