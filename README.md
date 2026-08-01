# QRBeam 2

QRBeam, dosyaları bir ekrandan diğer cihazın kamerasına hareketli QR kodlarla aktaran, tamamen istemci taraflı bir web uygulamasıdır. Dosya ve kamera görüntüsü hiçbir sunucuya gönderilmez.

## Bu sürümde çalışan özellikler

- Her tür dosyayı ham bayt olarak okuma
- SHA-256 bütünlük doğrulaması
- Rateless XOR fountain sembolleriyle kayıp kare kurtarma
- Her üç sembolde bir sistematik blok tekrarıyla garantili yeniden yakalama yolu
- Güvenli, Dengeli, Hızlı ve Turbo aktarım profilleri (8–26 FPS)
- 280–900 bayt ayarlanabilir QR payload kapasitesi
- Kamera merkez kırpma, 1080p/60 FPS isteği ve 30 FPS kararlı çözümleme
- Gerçek zamanlı goodput, çözülen blok, bozuk/tekrar kare ve yayın istatistikleri
- Ekran uyanık tutma ve tam ekran QR modu
- Dosyayı tarayıcıda yeniden oluşturup indirme
- Mobil öncelikli koyu arayüz
- PWA ve çevrimdışı önbellek
- GitHub Pages için göreli dosya yolları

> Optik aktarımda fiziksel olarak hiçbir kare kaybı olmayacağı garanti edilemez. QRBeam kaçan kareleri yeni fountain sembolleri ve sistematik tekrarlarla telafi eder; dosyayı yalnızca SHA-256 özeti birebir eşleştiğinde başarılı kabul eder. Çok büyük dosyalar için IndexedDB gruplama, WASM çözümleyici ve optik ACK sonraki geliştirme aşamalarıdır.

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
