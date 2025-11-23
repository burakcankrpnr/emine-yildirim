# Emine Yıldırım Psikolog Web Sitesi - Proje Planı

## Genel Bilgiler
- **Hedef**: Emine Yıldırım için profesyonel psikolog web sitesi
- **Örnek Site**: https://ezgiozay.com.tr/
- **Banner Örneği**: https://esraezmeci.com.tr/

## Tasarım Özellikleri

### Renk Paleti
- **Ana Renk 1**: `#f3ebe6` (Açık bej/pembe tonu)
- **Ana Renk 2**: `#f9f7f7` (Çok açık gri/beyaz tonu)
- **Vurgu Rengi**: `#764e45` (Kahverengi tonu)

### Tipografi
- **Yazı Fontu**: Montserrat

### Özel Özellikler
- İmleç efekti (mouse takibi) - genel renk tonlarıyla
- Sabit WhatsApp butonu (sağ altta)

## Sayfalar ve Özellikler

### 1. Ana Sayfa
- Banner/Video alanı (esraezmeci.com.tr tarzı)
- Hizmetler bölümü
- Hakkımda bölümü
- Instagram Reels alanı
- İletişim formu

### 2. Blog Sayfası
- Blog yazıları listesi
- Blog detay sayfası
- Kategori filtreleme

### 3. Forum Sayfası
- Forum kategorileri
- Forum konuları
- Yorum sistemi

### 4. İletişim Sayfası
- İletişim formu (SMTP ile bildirim)
- İletişim bilgileri
- Harita (opsiyonel)

### 5. Admin Paneli (/admin)
- Blog yönetimi (ekleme, düzenleme, silme)
- Forum yönetimi
- Kullanıcı yönetimi
- İletişim formu mesajları

## Teknik Gereksinimler

### Frontend
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Font**: Montserrat (Google Fonts)

### Backend
- **ORM**: Prisma
- **Veritabanı**: PostgreSQL (veya SQLite geliştirme için)
- **Email**: SMTP (Nodemailer)

### Özellikler
- İmleç efekti (custom cursor)
- Responsive tasarım
- SEO optimizasyonu

## Veritabanı Şeması

### Models
1. **User** (Admin kullanıcıları)
   - id, email, password, name, role

2. **BlogPost**
   - id, title, content, excerpt, image, authorId, published, createdAt, updatedAt

3. **ForumCategory**
   - id, name, description, slug

4. **ForumTopic**
   - id, title, content, categoryId, authorId, createdAt, updatedAt

5. **ForumReply**
   - id, content, topicId, authorId, createdAt

6. **ContactMessage**
   - id, name, email, subject, message, read, createdAt

7. **InstagramReel**
   - id, url, title, order, active

## Seed Data
- Admin kullanıcı oluşturulacak (email: admin@example.com)

## SMTP Yapılandırması
- Form gönderimlerinde Emine Hanım'a email bildirimi
- Environment variables ile yapılandırma

## Geliştirme Adımları
1. ✅ Proje planı oluşturuldu
2. Next.js projesi kurulumu
3. Tailwind CSS yapılandırması
4. Prisma kurulumu ve şema oluşturma
5. Temel sayfa yapıları
6. İmleç efekti implementasyonu
7. WhatsApp butonu
8. Banner/Video alanı
9. Blog sistemi
10. Forum sistemi
11. Admin paneli
12. SMTP entegrasyonu
13. Instagram Reels entegrasyonu

