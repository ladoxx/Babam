# Tabela ve Reklam Web Sitesi

Bu proje, profesyonel bir tabelacı için sade, mobil uyumlu ve kullanıcı dostu bir web sitesidir. Admin paneli sayesinde içerik yönetimi kolayca yapılabilir.

## Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn

### Kurulum Adımları

1. Projeyi klonlayın veya indirin

```bash
git clone <repo-url>
cd <proje-klasörü>
```

2. Bağımlılıkları yükleyin

```bash
npm install
# veya
yarn install
```

3. Geliştirme sunucusunu başlatın

```bash
npm run dev
# veya
yarn dev
```

4. Tarayıcınızda `http://localhost:5173` adresine giderek uygulamayı görüntüleyin

## Admin Paneline Erişim

Admin paneline erişmek için:

1. Tarayıcınızda `/admin` yoluna gidin (örn: `http://localhost:5173/admin`)
2. Admin panelinde yapılan değişiklikler otomatik olarak localStorage'a kaydedilir
3. "Değişiklikleri Kaydet" butonuna tıklayarak yaptığınız değişiklikleri kaydedin

Admin panelinde düzenleyebileceğiniz içerikler:
- Ana sayfa slider görselleri ve metinleri
- Hakkımızda sayfası içeriği ve görselleri
- Hizmetler listesi
- Galeri kategorileri ve görselleri
- İletişim bilgileri ve harita

## VPS Sunucusuna Dağıtım

### Derleme

Projeyi dağıtım için derlemek için:

```bash
npm run build
# veya
yarn build
```

Bu komut, `dist` klasöründe dağıtıma hazır dosyaları oluşturacaktır.

### VPS Sunucusuna Yükleme

1. VPS sunucunuza SSH ile bağlanın

```bash
ssh kullanici@sunucu-ip
```

2. Web sunucunuzun kök dizinine geçin (örn: Nginx için `/var/www/html/`)

3. Derlenen dosyaları sunucuya yükleyin (yerel makinenizden):

```bash
scp -r dist/* kullanici@sunucu-ip:/var/www/html/
```

### Nginx Yapılandırması

Nginx kullanıyorsanız, aşağıdaki yapılandırmayı `/etc/nginx/sites-available/default` dosyasına ekleyin:

```nginx
server {
    listen 80;
    server_name sizin-domain.com www.sizin-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Nginx'i yeniden başlatın:

```bash
sudo systemctl restart nginx
```

### Ortam Değişkenleri

Eğer ortam değişkenleri kullanıyorsanız, bunları `.env` dosyasında veya sunucu ortam değişkenlerinde ayarlayın. Örnek:

```
VITE_BASE_PATH=/
```

## Lisans

Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.
