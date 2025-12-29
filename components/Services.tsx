export default function Services() {
  const services = [
    {
      title: 'Psikolog Hizmetleri',
      items: ['Antalya psikolog', 'Antalya yetişkin terapisi'],
    },
    {
      title: 'Psikolog Antalya',
      items: ['Antalya aile danışmanlığı', 'Online psikolojik danışmanlık', 'Antalya çocuk psikoloğu'],
    },
    {
      title: 'Psikolog Antalya',
      items: ['Antalya psikoloğu', 'Online psikolog'],
    },
    {
      title: 'Online Psikolog',
      items: ['Çift terapisi', 'Ebeveyn rehberliği'],
    },
    {
      title: 'Psikolojik Danışmanlık Antalya',
      items: ['Emine Yıldırım', 'Psikolog Emine Yıldırım'],
    },
    {
      title: 'Antalya Psikolojik Destek',
      items: [],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#764e45] mb-6">
          Psikolog Hizmetleri
        </h2>
        <p className="text-center text-xl text-gray-700 max-w-4xl mx-auto mb-12">
          Antalya Psikolog Desteği: Yetişkin, Aile, Çocuk ve Ergen Psikolojisi
        </p>
        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-12">
          Antalya&apos;da profesyonel psikolojik destek alın! Yetişkin psikolojisi, aile ve çift terapisi,
          çocuk ve ergen psikolojisi ile ebeveyn danışmanlığı alanlarında uzman hizmetler sunulmaktadır.
          Çevrimiçi veya yüz yüze terapi seçenekleriyle ruh sağlığınızı güçlendirin ve
          yaşam kalitenizi artırın.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#f9f7f7] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-[#764e45]"
            >
              <h3 className="text-xl font-bold text-[#764e45] mb-4">
                {service.title}
              </h3>
              {service.items.length > 0 && (
                <ul className="space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="text-gray-600 flex items-start">
                      <span className="text-[#764e45] mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

