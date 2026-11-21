import AsyncStorage from '@react-native-async-storage/async-storage';

const KAYITLI_KISILER_ANAHTARI = '@bsm447_kayitli_kisiler';

// Kayıtlı tüm kişileri getirir
export const kayitliKisileriGetir = async () => {
  try {
    const jsonDeger = await AsyncStorage.getItem(KAYITLI_KISILER_ANAHTARI);
    return jsonDeger != null ? JSON.parse(jsonDeger) : [];
  } catch (hata) {
    console.error('Kayıtlar okunurken hata:', hata);
    return [];
  }
};

// Kişi zaten kayıtlı mı kontrol eder (login.uuid üzerinden)
export const kisiKayitliMi = async (uuid) => {
  const liste = await kayitliKisileriGetir();
  return liste.some((item) => item.login.uuid === uuid);
};

// Kişiyi kaydeder veya zaten kayıtlıysa listeden çıkarır
export const kisiKaydetVeyaCikar = async (kisi) => {
  try {
    const mevcutListe = await kayitliKisileriGetir();
    const varMi = mevcutListe.some((item) => item.login.uuid === kisi.login.uuid);

    let yeniListe;
    if (varMi) {
      yeniListe = mevcutListe.filter((item) => item.login.uuid !== kisi.login.uuid);
    } else {
      yeniListe = [...mevcutListe, kisi];
    }

    await AsyncStorage.setItem(KAYITLI_KISILER_ANAHTARI, JSON.stringify(yeniListe));
    return !varMi; // Yeni kayıt durumunu (true: kaydedildi, false: çıkarıldı) döner
  } catch (hata) {
    console.error('Kayıt güncellenirken hata:', hata);
    return false;
  }
};