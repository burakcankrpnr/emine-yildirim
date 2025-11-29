import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin kullanıcı oluştur
  const hashedPassword = await bcrypt.hash('emineyildirim07', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'emineyildirimpsikolog@gmail.com' },
    update: {
      password: hashedPassword,
      name: 'Emine Yıldırım',
      role: 'admin',
    },
    create: {
      email: 'emineyildirimpsikolog@gmail.com',
      password: hashedPassword,
      name: 'Emine Yıldırım',
      role: 'admin',
    },
  })

  console.log('Admin kullanıcı oluşturuldu:', admin)

  // Örnek forum kategorileri
  const category1 = await prisma.forumCategory.upsert({
    where: { slug: 'genel' },
    update: {},
    create: {
      name: 'Genel Tartışmalar',
      description: 'Genel konular hakkında tartışmalar',
      slug: 'genel',
    },
  })

  const category2 = await prisma.forumCategory.upsert({
    where: { slug: 'sorular' },
    update: {},
    create: {
      name: 'Sorular ve Cevaplar',
      description: 'Sorularınızı burada paylaşabilirsiniz',
      slug: 'sorular',
    },
  })

  console.log('Forum kategorileri oluşturuldu')

  // Admin kullanıcısı zaten Emine Yıldırım olarak oluşturuldu
  const emineYildirim = admin

  console.log('Kullanıcı hazır:', emineYildirim)

  // Örnek blog yazıları oluştur
  const blogPost1 = await prisma.blogPost.upsert({
    where: {
      id: 'blog-1',
    },
    update: {
      image: '/psikolog.jpg',
    },
    create: {
      id: 'blog-1',
      title: 'Çocuğunuzu Okulda Akran Zorbalığına Karşı Her Yaşta Nasıl Koruyabilirsiniz?',
      content: `
        <h2>Akran Zorbalığı Nedir?</h2>
        <p>Akran zorbalığı, bir çocuğun veya ergenin, kendisiyle aynı yaş grubundaki başka bir çocuğa veya ergene tekrarlayan şekilde zarar verme davranışıdır. Bu davranış fiziksel, sözel veya sosyal olabilir.</p>
        
        <h2>Zorbalığın Belirtileri</h2>
        <p>Çocuğunuzun zorbalığa maruz kaldığını gösteren bazı işaretler şunlardır:</p>
        <ul>
          <li>Okula gitmek istememe</li>
          <li>Okul sonrası üzgün veya sinirli görünme</li>
          <li>Fiziksel yaralanmalar</li>
          <li>Eşyalarının kaybolması veya hasar görmesi</li>
          <li>Arkadaş ilişkilerinde değişiklikler</li>
        </ul>
        
        <h2>Nasıl Yardımcı Olabilirsiniz?</h2>
        <p>Çocuğunuzla açık iletişim kurun. Onu dinleyin ve duygularını ciddiye alın. Okul yönetimiyle iletişime geçin ve durumu bildirin. Çocuğunuza güvenli alanlar yaratın ve profesyonel destek almayı düşünün.</p>
      `,
      excerpt: 'Akran zorbalığı, çocukların okul hayatında karşılaşabileceği ciddi bir sorundur. Bu yazıda, çocuğunuzu zorbalıktan korumak için pratik öneriler bulacaksınız.',
      image: '/psikolog.jpg',
      published: true,
      authorId: emineYildirim.id,
    },
  })

  const blogPost2 = await prisma.blogPost.upsert({
    where: {
      id: 'blog-2',
    },
    update: {
      image: '/psikolog.jpg',
    },
    create: {
      id: 'blog-2',
      title: 'TikTok Çocuklar İçin Güvenli mi?',
      content: `
        <h2>TikTok ve Çocuklar</h2>
        <p>TikTok, günümüzde çocuklar ve gençler arasında oldukça popüler bir sosyal medya platformudur. Ancak, bu platformun çocuklar için güvenli olup olmadığı konusunda ebeveynlerin endişeleri bulunmaktadır.</p>
        
        <h2>Potansiyel Riskler</h2>
        <p>TikTok kullanımında dikkat edilmesi gereken bazı riskler:</p>
        <ul>
          <li>Uygunsuz içerik maruziyeti</li>
          <li>Siber zorbalık</li>
          <li>Gizlilik endişeleri</li>
          <li>Aşırı kullanım ve bağımlılık</li>
          <li>Yaşa uygun olmayan etkileşimler</li>
        </ul>
        
        <h2>Güvenli Kullanım İçin Öneriler</h2>
        <p>Çocuğunuzun TikTok kullanımını güvenli hale getirmek için:</p>
        <ul>
          <li>Aile eşleştirme özelliğini kullanın</li>
          <li>Gizlilik ayarlarını yapılandırın</li>
          <li>Kullanım süresini sınırlandırın</li>
          <li>Düzenli olarak içerikleri kontrol edin</li>
          <li>Açık iletişim kurun</li>
        </ul>
      `,
      excerpt: 'TikTok gibi sosyal medya platformlarının çocuklar için güvenli kullanımı hakkında bilgi edinin ve çocuğunuzu nasıl koruyabileceğinizi öğrenin.',
      image: '/psikolog.jpg',
      published: true,
      authorId: emineYildirim.id,
    },
  })

  const blogPost3 = await prisma.blogPost.upsert({
    where: {
      id: 'blog-3',
    },
    update: {
      image: '/psikolog.jpg',
    },
    create: {
      id: 'blog-3',
      title: 'Çocukların TikTok Kullanımı, Ebeveyn Rehberi ve 10 Dakikalık Kriz Planı',
      content: `
        <h2>Ebeveynler İçin TikTok Rehberi</h2>
        <p>Çocuğunuzun TikTok kullanımını yönetmek için kapsamlı bir rehber hazırladık. Bu rehber, platformun özelliklerini anlamanıza ve çocuğunuzun güvenliğini sağlamanıza yardımcı olacaktır.</p>
        
        <h2>10 Dakikalık Kriz Planı</h2>
        <p>Çocuğunuzun TikTok ile ilgili bir sorun yaşadığını fark ettiğinizde:</p>
        <ol>
          <li><strong>Durumu Değerlendirin (2 dk):</strong> Sorunun ne olduğunu anlamaya çalışın</li>
          <li><strong>Çocuğunuzla Konuşun (3 dk):</strong> Açık ve destekleyici bir şekilde konuşun</li>
          <li><strong>Hemen Müdahale Edin (2 dk):</strong> Gerekli güvenlik önlemlerini alın</li>
          <li><strong>Kayıt Tutun (1 dk):</strong> Olayları belgeleyin</li>
          <li><strong>Profesyonel Destek Alın (2 dk):</strong> Gerekirse uzman desteği arayın</li>
        </ol>
        
        <h2>Önleyici Önlemler</h2>
        <p>Kriz durumlarından kaçınmak için:</p>
        <ul>
          <li>Düzenli aile toplantıları yapın</li>
          <li>Teknoloji kullanım kuralları belirleyin</li>
          <li>Çocuğunuzun aktivitelerini takip edin</li>
          <li>Güvenli internet kullanımı hakkında eğitim verin</li>
        </ul>
      `,
      excerpt: 'Çocuğunuzun TikTok kullanımında karşılaşabileceğiniz kriz durumları için hazırlıklı olun. 10 dakikalık kriz planı ile hızlı ve etkili müdahale edin.',
      image: '/psikolog.jpg',
      published: true,
      authorId: emineYildirim.id,
    },
  })

  const blogPost4 = await prisma.blogPost.upsert({
    where: {
      id: 'blog-4',
    },
    update: {
      image: '/psikolog.jpg',
    },
    create: {
      id: 'blog-4',
      title: 'Çocuklarda Kaygı ve Stres Yönetimi: Ebeveynler İçin Rehber',
      content: `
        <h2>Çocuklarda Kaygı Nedir?</h2>
        <p>Kaygı, çocukların yaşamlarında normal bir duygudur. Ancak, aşırı kaygı çocukların günlük yaşamlarını etkileyebilir ve gelişimlerini olumsuz etkileyebilir.</p>
        
        <h2>Kaygı Belirtileri</h2>
        <p>Çocuğunuzda kaygı belirtileri şunlar olabilir:</p>
        <ul>
          <li>Uyku problemleri</li>
          <li>İştah değişiklikleri</li>
          <li>Okula gitmek istememe</li>
          <li>Sosyal aktivitelerden kaçınma</li>
          <li>Fiziksel şikayetler (baş ağrısı, karın ağrısı)</li>
        </ul>
        
        <h2>Nasıl Yardımcı Olabilirsiniz?</h2>
        <p>Çocuğunuzun kaygısını yönetmesine yardımcı olmak için:</p>
        <ul>
          <li>Açık iletişim kurun ve duygularını dinleyin</li>
          <li>Güvenli bir ortam yaratın</li>
          <li>Nefes alma ve gevşeme teknikleri öğretin</li>
          <li>Düzenli rutinler oluşturun</li>
          <li>Gerekirse profesyonel destek alın</li>
        </ul>
      `,
      excerpt: 'Çocuklarda kaygı ve stres yönetimi hakkında bilgi edinin ve çocuğunuzun duygusal sağlığını desteklemek için pratik öneriler bulun.',
      image: '/psikolog.jpg',
      published: true,
      authorId: emineYildirim.id,
    },
  })

  const blogPost5 = await prisma.blogPost.upsert({
    where: {
      id: 'blog-5',
    },
    update: {
      image: '/psikolog.jpg',
    },
    create: {
      id: 'blog-5',
      title: 'Ergenlik Döneminde Ebeveyn-Çocuk İletişimi',
      content: `
        <h2>Ergenlik Dönemi Özellikleri</h2>
        <p>Ergenlik dönemi, çocukların fiziksel, duygusal ve sosyal olarak büyük değişimler yaşadığı bir dönemdir. Bu dönemde ebeveyn-çocuk ilişkisi de değişir.</p>
        
        <h2>İletişim Zorlukları</h2>
        <p>Ergenlik döneminde yaşanabilecek iletişim zorlukları:</p>
        <ul>
          <li>Çatışmaların artması</li>
          <li>Özerklik arayışı</li>
          <li>Duygusal dalgalanmalar</li>
          <li>Arkadaş ilişkilerine öncelik verme</li>
          <li>Ebeveynlerden uzaklaşma</li>
        </ul>
        
        <h2>Etkili İletişim İçin Öneriler</h2>
        <p>Ergenlik döneminde sağlıklı iletişim için:</p>
        <ul>
          <li>Dinlemeye zaman ayırın</li>
          <li>Yargılamadan konuşun</li>
          <li>Sınırları birlikte belirleyin</li>
          <li>Güven oluşturun</li>
          <li>Profesyonel destek almayı düşünün</li>
        </ul>
      `,
      excerpt: 'Ergenlik döneminde ebeveyn-çocuk iletişimini güçlendirmek için pratik öneriler ve stratejiler öğrenin.',
      image: '/psikolog.jpg',
      published: true,
      authorId: emineYildirim.id,
    },
  })

  const blogPost6 = await prisma.blogPost.upsert({
    where: {
      id: 'blog-6',
    },
    update: {
      image: '/psikolog.jpg',
    },
    create: {
      id: 'blog-6',
      title: 'Çift İlişkilerinde Çatışma Çözme Stratejileri',
      content: `
        <h2>Çift İlişkilerinde Çatışma</h2>
        <p>Çift ilişkilerinde çatışma normal ve kaçınılmazdır. Önemli olan, çatışmaları sağlıklı bir şekilde yönetmektir.</p>
        
        <h2>Çatışma Nedenleri</h2>
        <p>Çiftler arasında çatışmalara neden olabilecek faktörler:</p>
        <ul>
          <li>İletişim sorunları</li>
          <li>Farklı beklentiler</li>
          <li>Stres ve yaşam değişiklikleri</li>
          <li>Mali konular</li>
          <li>Çocuk yetiştirme farklılıkları</li>
        </ul>
        
        <h2>Çatışma Çözme Stratejileri</h2>
        <p>Sağlıklı çatışma çözme için:</p>
        <ul>
          <li>Aktif dinleme yapın</li>
          <li>Empati kurun</li>
          <li>Çözüm odaklı yaklaşın</li>
          <li>Uzlaşma arayın</li>
          <li>Gerekirse çift terapisi alın</li>
        </ul>
      `,
      excerpt: 'Çift ilişkilerinde çatışmaları sağlıklı bir şekilde yönetmek ve ilişkinizi güçlendirmek için pratik stratejiler öğrenin.',
      image: '/psikolog.jpg',
      published: true,
      authorId: emineYildirim.id,
    },
  })

  const blogPost7 = await prisma.blogPost.upsert({
    where: {
      id: 'blog-7',
    },
    update: {
      image: '/psikolog.jpg',
    },
    create: {
      id: 'blog-7',
      title: 'Dijital Dünyada Çocuk Güvenliği: Ebeveynler İçin Kapsamlı Rehber',
      content: `
        <h2>Dijital Dünya ve Çocuklar</h2>
        <p>Günümüzde çocuklar dijital dünyada daha fazla zaman geçiriyor. Bu durum, ebeveynlerin çocuklarının güvenliğini sağlaması için yeni stratejiler geliştirmesini gerektiriyor.</p>
        
        <h2>Dijital Riskler</h2>
        <p>Çocukların dijital dünyada karşılaşabileceği riskler:</p>
        <ul>
          <li>Siber zorbalık</li>
          <li>Uygunsuz içerik maruziyeti</li>
          <li>Gizlilik ihlalleri</li>
          <li>Online yabancılarla iletişim</li>
          <li>Ekran bağımlılığı</li>
        </ul>
        
        <h2>Güvenlik Önlemleri</h2>
        <p>Çocuğunuzun dijital güvenliğini sağlamak için:</p>
        <ul>
          <li>Ebeveyn kontrolü yazılımları kullanın</li>
          <li>Gizlilik ayarlarını yapılandırın</li>
          <li>Düzenli olarak çocuğunuzla konuşun</li>
          <li>Ekran süresini sınırlandırın</li>
          <li>Dijital okuryazarlık eğitimi verin</li>
        </ul>
      `,
      excerpt: 'Dijital dünyada çocuğunuzun güvenliğini sağlamak için kapsamlı bir rehber ve pratik öneriler bulun.',
      image: '/psikolog.jpg',
      published: true,
      authorId: emineYildirim.id,
    },
  })

  console.log('Blog yazıları oluşturuldu:', { blogPost1, blogPost2, blogPost3, blogPost4, blogPost5, blogPost6, blogPost7 })

  // Örnek yorumlar (testimonials) oluştur
  const testimonial1 = await prisma.testimonial.upsert({
    where: { id: 'testimonial-1' },
    update: {},
    create: {
      id: 'testimonial-1',
      name: 'Şule Ali',
      email: 'sule.ali@example.com',
      comment: 'Psikoloğa gitme konusunda başta çok tereddüt yaşamıştım, hep ertelediğim ama kendim için attığım en önemli adımdı. Emine hanımdan aldığım destek sayesinde kendimi daha iyi tanımaya başladım. Her seansı iple çekiyorum. Olaylara verdiğim tepkilerde ciddi değişimler oldu. Çok hoşgörülü, enerjisiyle, tebessümüyle insanın içini ısıtan mükemmel bir insan.',
      approved: true,
    },
  })

  const testimonial2 = await prisma.testimonial.upsert({
    where: { id: 'testimonial-2' },
    update: {},
    create: {
      id: 'testimonial-2',
      name: 'Ahmet Faik Altan',
      email: 'ahmet.faik@example.com',
      comment: 'Emine hanımla yolum kesiştiğinden bu yana yaşadığım psikolojik problemlerde çok yol katettim. Çok hoşgörülü işinde profesyonel, muhteşem bakış açısına sahip farkındalığı yüksek bir psikolog. İyi ki yolum kesişmiş.',
      approved: true,
    },
  })

  const testimonial3 = await prisma.testimonial.upsert({
    where: { id: 'testimonial-3' },
    update: {},
    create: {
      id: 'testimonial-3',
      name: 'Derya Eroğlu',
      email: 'derya.eroglu@example.com',
      comment: 'Emine Hanımdan kısa sürede son derece memnun kaldığımı belirtmek istiyorum. İlk günden itibaren sıcak, samimi ve profesyonel bir yaklaşım sergileyerek kendimi rahat hissetmemi sağladı. Görüşmelerde karşılaştığım zorlukları büyük bir dikkatle dinleyip anlamlandırdı ve içtenlikle çözüm yolları sundu.',
      approved: true,
    },
  })

  const testimonial4 = await prisma.testimonial.upsert({
    where: { id: 'testimonial-4' },
    update: {},
    create: {
      id: 'testimonial-4',
      name: 'Mehmet Yılmaz',
      email: 'mehmet.yilmaz@example.com',
      comment: 'Emine hanım ile çalışmak hayatımda aldığım en iyi kararlardan biri oldu. Kendisi gerçekten çok anlayışlı ve profesyonel bir psikolog. Her seans sonrası kendimi daha iyi hissediyorum.',
      approved: true,
    },
  })

  const testimonial5 = await prisma.testimonial.upsert({
    where: { id: 'testimonial-5' },
    update: {},
    create: {
      id: 'testimonial-5',
      name: 'Ayşe Demir',
      email: 'ayse.demir@example.com',
      comment: 'Emine hanıma çocuğumun okul sorunları için başvurduk. Çok sabırlı ve anlayışlı bir yaklaşım sergiledi. Hem çocuğum hem de biz aile olarak çok fayda gördük. Teşekkür ederiz.',
      approved: true,
    },
  })

  const testimonial6 = await prisma.testimonial.upsert({
    where: { id: 'testimonial-6' },
    update: {},
    create: {
      id: 'testimonial-6',
      name: 'Can Özkan',
      email: 'can.ozkan@example.com',
      comment: 'İlişki problemlerimiz için Emine hanıma başvurduk. Çift terapisi sürecinde bize çok yardımcı oldu. Artık daha sağlıklı bir iletişim kurabiliyoruz. Herkese tavsiye ederim.',
      approved: true,
    },
  })

  const testimonial7 = await prisma.testimonial.upsert({
    where: { id: 'testimonial-7' },
    update: {},
    create: {
      id: 'testimonial-7',
      name: 'Zeynep Kaya',
      email: 'zeynep.kaya@example.com',
      comment: 'Kaygı ve stres yönetimi konusunda Emine hanımdan çok destek aldım. Öğrendiğim teknikler sayesinde günlük hayatımda çok daha rahatım. Kendisi gerçekten çok bilgili ve yardımsever.',
      approved: true,
    },
  })

  const testimonial8 = await prisma.testimonial.upsert({
    where: { id: 'testimonial-8' },
    update: {},
    create: {
      id: 'testimonial-8',
      name: 'Burak Şahin',
      email: 'burak.sahin@example.com',
      comment: 'Ergenlik dönemindeki oğlum için Emine hanıma başvurduk. Hem oğlum hem de biz ebeveynler olarak çok şey öğrendik. İletişimimiz çok daha iyi hale geldi.',
      approved: true,
    },
  })

  console.log('Yorumlar oluşturuldu:', { testimonial1, testimonial2, testimonial3, testimonial4, testimonial5, testimonial6, testimonial7, testimonial8 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

