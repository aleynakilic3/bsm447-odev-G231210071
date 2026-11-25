# BSM447 Mobil Uygulama Geliştirme - Dönem Ödevi

* **Öğrenci No:** G231210071
* **Konu ve Varyant:** K31 Kişi Rehberi — a. Rehber A
* **Ek Kural:** 9. Paylaş
* **Kalıcı Veri Yöntemi:** AsyncStorage (`@react-native-async-storage/async-storage`)

## Bağlantılar
* **Android APK İndirme Bağlantısı:** [EAS Build APK İndir](BURAYA_EAS_APK_LINKINI_YAPISTIR)
* **Uygulama Ekran Kaydı (Maks. 1 dk):** [Ekran Kaydını İzle](BURAYA_VIDEO_LINKINI_YAPISTIR)

## Ekran Görüntüleri

| Liste Ekranı | Detay Ekranı | Kaydedilenler Ekranı |
| :---: | :---: | :---: |
| ![Liste](./screenshots/liste.png) | ![Detay](./screenshots/detay.png) | ![Kaydedilenler](./screenshots/kaydedilenler.png) |

## Özellikler
* Random User API (`seed=bsm447a`) üzerinden 30 Türkçe kişi kaydının çekilmesi ve `FlatList` ile listelenmesi.
* Büyük/küçük harfe duyarsız isim araması ve `18-30`, `31-50`, `51+` yaş aralığı filtrelemesi.
* Detay ekranında `Linking` ile doğrudan arama (`tel:`) ve e-posta gönderme (`mailto:`).
* **Ek Kural (Paylaş):** React Native `Share` API ile kişi bilgilerinin paylaşılması.
* `AsyncStorage` ile kişilerin kalıcı olarak kaydedilmesi ve uygulama kapatılıp açıldığında korunması.
