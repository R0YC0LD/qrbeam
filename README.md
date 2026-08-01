# QRBeam

QRBeam, dosyaları bir ekrandan diğer cihazın kamerasına hareketli QR kodlarla aktaran, tamamen istemci taraflı bir web uygulamasıdır. Dosya ve kamera görüntüsü hiçbir sunucuya gönderilmez.

## Bu sürümde çalışan özellikler

- Her tür dosyayı ham bayt olarak okuma
- SHA-256 bütünlük doğrulaması
- Sıralı ve döngüsel animasyonlu QR aktarımı
- Kamera ile QR parçalarını toplama ve tekrarları ayıklama
- Dosyayı tarayıcıda yeniden oluşturup indirme
- Mobil öncelikli koyu arayüz
- PWA ve çevrimdışı önbellek
- GitHub Pages için göreli dosya yolları

> Bu, güvenilir bir teknik prototiptir. Sıralı QR kullandığı için küçük dosyalar önerilir. LT fountain code, ZXing WASM worker havuzu, IndexedDB gruplama, şifreleme ve optik ACK sonraki geliştirme aşamalarıdır.

## Yerelde çalıştırma

```bash
npm install
npm run dev
```

Üretim kontrolü:

```bash
npm run build
npm run preview
```

## GitHub Pages ile yayınlama

1. Bu klasörün tamamını bir GitHub deposuna yükleyin.
2. Depoda **Settings → Pages** bölümüne gidin.
3. **Build and deployment → Source** seçeneğini **GitHub Actions** yapın.
4. Dahil olan workflow ilk yüklemeden sonra siteyi otomatik yayınlar.

Kamera erişimi HTTPS ister. GitHub Pages HTTPS sağladığı için alıcı modu yayınlanan sitede çalışır.

## Gizlilik

Uygulamada dosya yükleme API'si veya sunucu bağlantısı yoktur. Tüm parçalama, QR üretme, tarama ve doğrulama tarayıcı içinde yapılır.
