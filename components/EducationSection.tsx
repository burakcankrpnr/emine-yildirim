export default function EducationSection() {
  const educations = [
    {
      title: "Konforlu Yaşamın Yeterince Konforlu Mu?",
      description: "Günümüz dünyasında, konforlu yaşam herkesin hayalini kurduğu bir hedef haline gelmiştir. Hepimiz rahat, huzurlu ve sıkıntılardan uzak bir yaşam sürmek isteriz..."
    },
    {
      title: "Yalnızlık Sendromu Nedir?",
      description: "Yalnızlık sendromu, bireyin sosyal çevresinde yetersiz bağlar hissetmesi sonucu derin bir yalnızlık duygusuna kapılmasıdır. Bu durum, kişinin içsel boşluk, umutsuzluk ve sosyal ortamlardan kaçınma gibi belirtilerle kendini gösterebilir."
    },
    {
      title: "Duygusal Manipülasyon'a Dikkat!",
      description: "Duygusal manipülasyon, bir kişinin duygusal zayıflıklarını, korkularını, suçluluk duygusunu ya da güvenini kendi çıkarları için kullanarak onu yönlendirmesi veya kontrol etmesi olarak tanımlanabilir."
    }
  ]

  return (
    <section className="py-20 bg-[#f9f7f7]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#764e45] mb-4">
              Zorluklardan Güce
            </h2>
            <h3 className="text-2xl text-gray-700 mb-4">
              Emine Yıldırım&apos;dan Hayatınıza Dokunacak Büyülü ve İlham Verici Online Psikoloji Eğitimleri
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {educations.map((edu, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="h-56 bg-gradient-to-br from-[#764e45]/20 to-[#5a3a33]/10 flex items-center justify-center">
                  <div className="text-6xl">📚</div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-[#764e45] mb-3">
                    {edu.title}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {edu.description}
                  </p>
                  <button className="text-[#764e45] font-semibold hover:underline">
                    Devamı →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

