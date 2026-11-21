import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { kisiKayitliMi, kisiKaydetVeyaCikar } from '../utils/storage';

export default function DetayScreen({ route }) {
  const { kisi } = route.params;
  const [kaydedildi, setKaydedildi] = useState(false);

  // Ekran açıldığında kişinin AsyncStorage'da kayıtlı olup olmadığını kontrol et
  useEffect(() => {
    const durumKontrol = async () => {
      const durum = await kisiKayitliMi(kisi.login.uuid);
      setKaydedildi(durum);
    };
    durumKontrol();
  }, [kisi.login.uuid]);

  const tamAd = `${kisi.name.first} ${kisi.name.last}`;
  const tamAdres = `${kisi.location.street.name} No: ${kisi.location.street.number}, ${kisi.location.city} / ${kisi.location.state}, ${kisi.location.country}`;

  const aramaYap = () => {
    Linking.openURL(`tel:${kisi.phone}`).catch(() =>
      Alert.alert('Hata', 'Arama uygulaması açılamadı.')
    );
  };

  const epostaGonder = () => {
    Linking.openURL(`mailto:${kisi.email}`).catch(() =>
      Alert.alert('Hata', 'E-posta uygulaması açılamadı.')
    );
  };

  const kisiyiPaylas = async () => {
    try {
      const ozetMetin =
        `Kişi Rehberi - ${tamAd}\n` +
        `Telefon: ${kisi.phone}\n` +
        `Cep: ${kisi.cell}\n` +
        `E-posta: ${kisi.email}\n` +
        `Şehir: ${kisi.location.city}`;

      await Share.share({
        message: ozetMetin,
        title: tamAd,
      });
    } catch (hata) {
      Alert.alert('Hata', 'Paylaşım sırasında bir sorun oluştu.');
    }
  };

  const kaydetDurumuDegistir = async () => {
    const yeniDurum = await kisiKaydetVeyaCikar(kisi);
    setKaydedildi(yeniDurum);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.icerik}>
      {/* Üst Profil Kartı */}
      <View style={styles.profilKarti}>
        <Image
          source={{ uri: kisi.picture.large || kisi.picture.thumbnail }}
          style={styles.buyukAvatar}
        />
        <Text style={styles.adSoyad}>{tamAd}</Text>
        <Text style={styles.yasBilgisi}>{kisi.dob.age} yaşında</Text>
      </View>

      {/* İletişim ve Konum Bilgileri */}
      <View style={styles.bilgiKarti}>
        <View style={styles.bilgiSatiri}>
          <Text style={styles.etiket}>E-posta</Text>
          <Text style={styles.deger}>{kisi.email}</Text>
        </View>

        <View style={styles.bilgiSatiri}>
          <Text style={styles.etiket}>Telefon</Text>
          <Text style={styles.deger}>{kisi.phone}</Text>
        </View>

        <View style={styles.bilgiSatiri}>
          <Text style={styles.etiket}>Cep Telefonu</Text>
          <Text style={styles.deger}>{kisi.cell}</Text>
        </View>

        <View style={[styles.bilgiSatiri, styles.sonSatir]}>
          <Text style={styles.etiket}>Adres</Text>
          <Text style={styles.deger}>{tamAdres}</Text>
        </View>
      </View>

      {/* Hızlı İşlem Düğmeleri: Ara, E-posta Gönder, Paylaş */}
      <View style={styles.aksiyonSatiri}>
        <TouchableOpacity style={[styles.aksiyonButon, styles.araButon]} onPress={aramaYap}>
          <Ionicons name="call" size={20} color="#FFF" />
          <Text style={styles.aksiyonButonMetin}>Ara</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.aksiyonButon, styles.mailButon]} onPress={epostaGonder}>
          <Ionicons name="mail" size={20} color="#FFF" />
          <Text style={styles.aksiyonButonMetin}>E-posta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.aksiyonButon, styles.paylasButon]} onPress={kisiyiPaylas}>
          <Ionicons name="share-social" size={20} color="#FFF" />
          <Text style={styles.aksiyonButonMetin}>Paylaş</Text>
        </TouchableOpacity>
      </View>

      {/* Kaydet / Kaydedilenlerden Çıkar Düğmesi */}
      <TouchableOpacity
        style={[styles.kaydetButon, kaydedildi && styles.kaydedildiButon]}
        onPress={kaydetDurumuDegistir}
      >
        <Ionicons
          name={kaydedildi ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color="#FFF"
        />
        <Text style={styles.kaydetButonMetin}>
          {kaydedildi ? 'Kaydedilenlerden Çıkar' : 'Kaydet'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6F8' },
  icerik: { padding: 16, paddingBottom: 32 },
  profilKarti: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  buyukAvatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  adSoyad: { fontSize: 22, fontWeight: 'bold', color: '#111' },
  yasBilgisi: { fontSize: 15, color: '#666', marginTop: 4 },
  bilgiKarti: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  bilgiSatiri: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  sonSatir: { borderBottomWidth: 0 },
  etiket: { fontSize: 12, fontWeight: '600', color: '#888', marginBottom: 4 },
  deger: { fontSize: 15, color: '#222' },
  aksiyonSatiri: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  aksiyonButon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  araButon: { backgroundColor: '#34C759' },
  mailButon: { backgroundColor: '#007AFF' },
  paylasButon: { backgroundColor: '#5856D6' },
  aksiyonButonMetin: { color: '#FFF', fontWeight: '600', fontSize: 14, marginLeft: 6 },
  kaydetButon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9500',
    paddingVertical: 14,
    borderRadius: 10,
  },
  kaydedildiButon: { backgroundColor: '#FF3B30' },
  kaydetButonMetin: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
});