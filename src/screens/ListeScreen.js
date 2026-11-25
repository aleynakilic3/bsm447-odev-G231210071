import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const API_URL = 'https://randomuser.me/api/?results=30&nat=tr&seed=bsm447a';
const YAS_ARALIKLARI = ['Tümü', '18-30', '31-50', '51+'];

export default function ListeScreen({ navigation }) {
  const [kisiler, setKisiler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(false);
  const [aramaMetni, setAramaMetni] = useState('');
  const [seciliYas, setSeciliYas] = useState('Tümü');

  useEffect(() => {
    verileriGetir();
  }, []);

  const verileriGetir = async () => {
    try {
      setYukleniyor(true);
      setHata(false);
      const cevap = await fetch(API_URL);
      if (!cevap.ok) {
        throw new Error(`Sunucu hatası: ${cevap.status}`);
      }
      const json = await cevap.json();
      setKisiler(json.results || []);
    } catch (e) {
      console.error('Veri cekme hatasi:', e);
      setHata(true);
    } finally {
      setYukleniyor(false);
    }
  };

  // Arama metni ve yaş aralığına göre dinamik süzme
  const filtrelenmisKisiler = kisiler.filter((kisi) => {
    const tamAd = `${kisi.name.first} ${kisi.name.last}`.toLocaleLowerCase('tr-TR');
    const aranan = aramaMetni.toLocaleLowerCase('tr-TR').trim();
    const isimUyuyor = tamAd.includes(aranan);

    const yas = kisi.dob.age;
    let yasUyuyor = true;
    if (seciliYas === '18-30') {
      yasUyuyor = yas >= 18 && yas <= 30;
    } else if (seciliYas === '31-50') {
      yasUyuyor = yas >= 31 && yas <= 50;
    } else if (seciliYas === '51+') {
      yasUyuyor = yas >= 51;
    }

    return isimUyuyor && yasUyuyor;
  });

  const kisiSatiriRender = ({ item }) => (
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
    </TouchableOpacity>
  );

  if (yukleniyor) {
    return (
      <View style={styles.merkez}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.yukleniyorMetin}>Kişiler yükleniyor...</Text>
      </View>
    );
  }

  if (hata) {
    return (
      <View style={styles.merkez}>
        <Text style={styles.hataMetin}>Bağlantı yok</Text>
        <Text style={styles.hataAciklama}>
          Kişiler yüklenemedi. İnternet bağlantınızı kontrol edin.
        </Text>
        <TouchableOpacity style={styles.tekrarButon} onPress={verileriGetir}>
          <Text style={styles.tekrarButonMetin}>Tekrar dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Arama Kutusu */}
      <TextInput
        style={styles.aramaKutusu}
        placeholder="İsim veya soyisim ara..."
        value={aramaMetni}
        onChangeText={setAramaMetni}
      />

      {/* Yaş Aralığı Süzgeçleri */}
      <View style={styles.filtreSatiri}>
        {YAS_ARALIKLARI.map((aralik) => {
          const aktif = seciliYas === aralik;
          return (
            <TouchableOpacity
              key={aralik}
              style={[styles.cip, aktif && styles.aktifCip]}
              onPress={() => setSeciliYas(aralik)}
            >
              <Text style={[styles.cipMetin, aktif && styles.aktifCipMetin]}>
                {aralik}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Kişi Listesi */}
      <FlatList
        data={filtrelenmisKisiler}
        keyExtractor={(item) => item.login.uuid}
        renderItem={kisiSatiriRender}
        contentContainerStyle={styles.listeIcerik}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.sonucYok}>Sonuç bulunamadı</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  merkez: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yukleniyorMetin: {
    marginTop: 8,
    color: '#555',
  },
  hataMetin: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  hataAciklama: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  tekrarButon: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  tekrarButonMetin: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },
  sonucYok: {
    textAlign: 'center',
    color: '#777',
    fontSize: 15,
    marginTop: 24,
  },
  aramaKutusu: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 10,
  },
  filtreSatiri: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cip: {
    flex: 1,
    backgroundColor: '#E4E7EC',
    paddingVertical: 8,
    marginHorizontal: 3,
    borderRadius: 20,
    alignItems: 'center',
  },
  aktifCip: {
    backgroundColor: '#007AFF',
  },
  cipMetin: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  aktifCipMetin: {
    color: '#FFF',
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
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});