export default function Quote() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-[#764e45] to-[#5a3a33] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 md:mb-8">
            <svg
              className="w-12 h-12 md:w-16 md:h-16 mx-auto text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed mb-6 md:mb-8 px-2 md:px-0">
            &ldquo;Kişinin yaşamını değiştiren en büyük güç, geçmişi değil; geleceğe dair kurduğu anlamlı bir amaçtır.&rdquo;
          </blockquote>
          <p className="text-base md:text-lg font-semibold">~Alfred Adler</p>
        </div>
      </div>
    </section>
  )
}

