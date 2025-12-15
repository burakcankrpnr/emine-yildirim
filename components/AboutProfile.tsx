'use client'

import Image from 'next/image'

export default function AboutProfile() {
  return (
    <section 
      className="relative py-4 md:py-8 px-4"
      style={{
        backgroundImage: 'url(/brush-effect-1-1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white rounded-lg shadow-xl p-4 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Sol Sütun - Fotoğraf ve Alıntı */}
            <div className="relative">
              {/* Fotoğraf */}
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src="/kapak.jpg"
                  alt="Psikolog Emine Yıldırım"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Alıntı - Mobilde fotoğrafın altında, büyük ekranlarda ortalı overlay */}
              <div className="relative mt-4 bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full md:max-w-sm lg:max-w-md lg:w-[calc(100%-2rem)] lg:absolute lg:bottom-2 lg:left-1/2 lg:-translate-x-1/2 lg:mt-0">
              <div className="mb-8">
            <svg
              className="w-16 h-16 mx-auto text-[#764e45]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
                <p className="text-sm md:text-lg lg:text-xl text-gray-900 font-serif italic leading-relaxed text-center">
                  İnsan ruhunun<br />
                  derinliklerini anlayabilmek,<br />
                  empatiyle dinlemeyi ve<br />
                  sabırla çözüm üretmeyi<br />
                  gerektirir.
                </p>
              </div>
            </div>

            {/* Sağ Sütun - Bilgiler */}
            <div className="space-y-4 md:space-y-6">
              {/* Sub-heading */}
              <div className="sub-heading single">
                <p className="text-xs md:text-sm lg:text-base text-gray-700 font-semibold uppercase tracking-wide">
                  EMİNE YILDIRIM KİMDİR?
                </p>
              </div>

              {/* Ana Başlık */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-gray-900 leading-tight">
                 <span className="font-bold italic">Psikolog</span> Emine Yıldırım
              </h2>

              {/* Açıklama */}
              <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                Ben Psikolog Emine Yıldırım. İnsanları anlamayı, dinlemeyi ve onlara eşlik etmeyi her zaman çok sevdim. Bu ilgi beni psikoloji alanına yönlendirdi ve Antalya Belek Üniversitesi Psikoloji Bölümü&apos;nden mezun oldum. Öğrenim sürecim boyunca birden çok kurumda staj yaparak hem psikolojik danışmanlık süreçlerine hem de eğitsel danışmanlığa dair önemli deneyimler kazandım.
                <br /><br />
                Empati kurmak, güven vermek ve etkili iletişim kurmak benim en güçlü yönlerim arasında. Her bireyin yaşam yolculuğunda benzersiz bir hikayesi olduğuna inanıyor, bu hikayeyi anlamlandırma sürecinde kişilere destek olmayı önemsiyorum.
                <br /><br />
                Amacım, danışanlarıma profesyonel bir şekilde eşlik etmek ve kalıcı bir iz bırakmaktır.
              </p>

              {/* Uzmanlık Alanları */}
              <ul className="space-y-2 md:space-y-3">
                {[
                  'Yetişkin Psikolojisi',
                  'Aile ve Çift Psikolojisi',
                  'Çocuk ve Ergen Psikolojisi',
                  'Ebeveyn Danışmanlığı',
                  'Online Psikolojik Danışmanlık'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 md:gap-3">
                    <span className="text-[#764e45] mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm md:text-base lg:text-lg text-gray-700">alanlarında hizmet sunar.</p>

              {/* İmza ve İsim */}
              <div className="  space-y-2">
                <div className="text-2xl md:text-3xl lg:text-4xl text-gray-900 italic" style={{ fontFamily: 'var(--font-dancing-script), cursive' }}>
                  Emine Yıldırım
                </div>
                  <span className="text-xs md:text-sm lg:text-base">Psikolog</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

