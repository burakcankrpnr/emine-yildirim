# Emine Yıldırım Psikolog Web Sitesi

Profesyonel psikolog web sitesi - Next.js, Tailwind CSS ve Prisma ile geliştirilmiştir.

## Özellikler

- 🎨 Modern ve responsive tasarım
- 📝 Blog sistemi
- 💬 Forum sistemi
- 📧 SMTP ile email bildirimleri
- 📱 Instagram Reels entegrasyonu
- 🔐 Admin paneli
- 🖱️ Özel imleç efekti
- 📲 WhatsApp butonu
- ☁️ Cloudinary ile görsel yönetimi

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Environment değişkenlerini ayarlayın:
`.env` dosyası oluşturun ve gerekli değişkenleri ekleyin:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="your-email@gmail.com"
SMTP_TO="emine@gmail.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="905326499146"

# Cloudinary Ayarları
CLOUDINARY_CLOUD_NAME="dyn0dtehh"
CLOUDINARY_API_KEY="232257585894853"
CLOUDINARY_API_SECRET="1FeVxm3zJs9tR6YQpHZ6twHPFh8"
# Alternatif olarak CLOUDINARY_URL kullanabilirsiniz:
# CLOUDINARY_URL="cloudinary://232257585894853:1FeVxm3zJs9tR6YQpHZ6twHPFh8@dyn0dtehh"
```

3. Veritabanını oluşturun:
```bash
npx prisma db push
```

4. Seed verilerini yükleyin:
```bash
npm run db:seed
```

5. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## Admin Girişi

- Email: admin@gmail.com
- Şifre: admin123

## Renk Paleti

- Ana Renk 1: `#f3ebe6`
- Ana Renk 2: `#f9f7f7`
- Vurgu Rengi: `#764e45`

## Teknolojiler

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma
- SQLite (geliştirme)
- Nodemailer (SMTP)
- Cloudinary (Görsel yönetimi)

