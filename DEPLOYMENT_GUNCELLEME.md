# Canlı Ortam Güncelleme Rehberi

## 🔧 Yapılan Düzeltmeler

### Sorun
Admin panelinden eklenen reels, blog yazıları ve testimonial'lar canlı ortamda anında görünmüyordu.

### Neden
1. **Next.js Cache**: Server component'ler default olarak cache'leniyordu
2. **Docker Volume Eksikliği**: Veritabanı ve upload'lar kalıcı değildi

### Çözümler

#### ✅ 1. Dynamic Rendering Eklendi
Aşağıdaki dosyalara `export const dynamic = 'force-dynamic'` eklendi:

- `components/InstagramReelsServer.tsx`
- `components/BlogSection.tsx`
- `components/Testimonials.tsx`
- `app/admin/reels/page.tsx`
- `app/admin/blog/page.tsx`
- `app/admin/messages/page.tsx`
- `app/admin/testimonials/page.tsx`

#### ✅ 2. Docker Volumes Eklendi
`docker-compose.yml` dosyasına kalıcı depolama eklendi:
```yaml
volumes:
  - ./prisma:/app/prisma
  - ./public/uploads:/app/public/uploads
```

---

## 🚀 Canlı Ortamda Güncelleme Adımları

### Adım 1: Kodu Güncelle
```bash
# Sunucuya bağlan (SSH ile)
cd /path/to/emineyildirim

# En son kodu çek
git pull origin main
```

### Adım 2: Mevcut Container'ı Durdur
```bash
docker-compose down
```

### Adım 3: Image'ı Yeniden Oluştur
```bash
# Cache kullanmadan yeniden build et
docker-compose build --no-cache
```

### Adım 4: Container'ı Başlat
```bash
docker-compose up -d
```

### Adım 5: Log'ları Kontrol Et
```bash
# Container'ın düzgün çalıştığını kontrol et
docker-compose logs -f frontend
```

---

## 🔍 Sorun Giderme

### 1. Veritabanı Kaybı
Eğer mevcut veritabanınızı kaybetmek istemiyorsanız, güncelleme öncesi yedek alın:

```bash
# Veritabanını yedeğe al
cp prisma/dev.db prisma/dev.db.backup
```

### 2. Container Başlamıyor
```bash
# Container'ı durdur ve temizle
docker-compose down -v

# Image'ı sil ve yeniden oluştur
docker rmi burakcankorpinar/emine-yildirim-psikolog
docker-compose up --build -d
```

### 3. Port Çakışması
Eğer 5006 portu kullanımdaysa, `docker-compose.yml` dosyasında portu değiştirin:
```yaml
ports:
  - "5007:3000"  # veya başka bir port
```

---

## 📝 Test Etme

Güncelleme sonrası test edin:

1. **Ana Sayfa**: `http://your-domain.com` - Reels görünüyor mu?
2. **Admin Panel**: `http://your-domain.com/admin` - Giriş yapabiliyor musunuz?
3. **Yeni Reel Ekle**: Admin panelden yeni reel ekleyin
4. **Ana Sayfayı Yenile**: Yeni reel anında görünmeli (F5)

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Build Süresi**: İlk build 5-10 dakika sürebilir
2. **Veritabanı Volume**: Artık container restart olsa bile veriler korunacak
3. **Cache**: Artık her sayfa yenileme güncel veriyi getirecek
4. **Production Build**: Next.js production mode'da çalışacak

---

## 🆘 Acil Durum: Eski Haline Dön

Eğer bir sorun çıkarsa:

```bash
# Önceki commit'e dön
git log  # commit hash'lerini gör
git checkout [önceki-commit-hash]

# Container'ı yeniden başlat
docker-compose down
docker-compose up --build -d
```

---

## 📞 İletişim

Sorun yaşarsanız:
- GitHub Issue açın
- Log dosyalarını (`docker-compose logs`) paylaşın
- Hata mesajlarını eksiksiz kaydedin

