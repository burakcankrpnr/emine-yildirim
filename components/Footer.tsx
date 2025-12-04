import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#2A2A2A] text-[#F5F5F5] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          {/* Column 1: Brand/About Section */}
          <div className="space-y-4 text-center md:text-left">
            <Link href="/" className="block mb-4 flex justify-center md:justify-start">
              <Image
                src="/emine-yildirim.png"
                alt="Emine Yıldırım Logo"
                width={200}
                height={200}
                className="object-contain"
              />
            </Link>
            <div className="flex items-center justify-center md:justify-start space-x-3 pt-4">
              <a href="#" className="w-8 h-8 rounded-full border border-[#F5F5F5] flex items-center justify-center hover:bg-[#A07B5B] transition-colors">
                <i className="fab fa-facebook-f text-[#F5F5F5] text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#F5F5F5] flex items-center justify-center hover:bg-[#A07B5B] transition-colors">
                <i className="fab fa-twitter text-[#F5F5F5] text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#F5F5F5] flex items-center justify-center hover:bg-[#A07B5B] transition-colors">
                <i className="fab fa-spotify text-[#F5F5F5] text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#F5F5F5] flex items-center justify-center hover:bg-[#A07B5B] transition-colors">
                <i className="fab fa-instagram text-[#F5F5F5] text-sm"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Contact Information */}
          <div>
            <h4 className="text-[#F5F5F5] font-serif text-lg font-bold mb-2">İletişim</h4>
            <div className="w-12 h-0.5 bg-[#A07B5B] mb-4"></div>
            <ul className="space-y-3 font-sans text-sm">
              {/* <li className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-[#A07B5B] mt-1"></i>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Şirinyalı,+İsmet+Gökşen+Cd.+Köşk+Apt.+No:+25/11+Kat:+4,+07100+Muratpaşa/Antalya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F5F5] hover:text-[#A07B5B] transition-colors cursor-pointer"
                >
                  Şirinyalı, İsmet Gökşen Cd. Köşk Apt. No: 25/11 Kat: 4, 07100 Muratpaşa/Antalya
                </a>
              </li> */}
              <li className="flex items-center space-x-3">
                <i className="fas fa-phone text-[#A07B5B]"></i>
                <a
                  href="tel:05326499146"
                  className="text-[#F5F5F5] hover:text-[#A07B5B] transition-colors cursor-pointer"
                >
                  Telefon: <span className="font-bold">+90 532 649 91 46</span>
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-envelope text-[#A07B5B]"></i>
                <a
                  href="mailto:emineyildirimpsikolog@gmail.com "
                  className="text-[#F5F5F5] hover:text-[#A07B5B] transition-colors cursor-pointer"
                >
                  Mail: <span className="font-bold">emineyildirimpsikolog@gmail.com </span>
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-clock text-[#A07B5B] mt-1"></i>
                <div className="text-[#F5F5F5]">
                  <div><span className="font-bold">Pazartesi - Cumartesi:</span> (09:00 - 18:00)</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Consultation Services */}
          <div>
            <h4 className="text-[#F5F5F5] font-serif text-lg font-bold mb-2">Danışmanlıklar</h4>
            <div className="w-12 h-0.5 bg-[#A07B5B] mb-4"></div>
            <ul className="space-y-2 font-sans text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#A07B5B]"></div>
                <Link href="/danismanliklar/cift-ve-aile-danismanligi" className="text-[#F5F5F5] hover:text-[#A07B5B] transition-colors">
                  Çift ve Aile Danışmanlığı
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#A07B5B]"></div>
                <Link href="/danismanliklar/cocuk-ergen-psikolojisi" className="text-[#F5F5F5] hover:text-[#A07B5B] transition-colors">
                  Çocuk - Ergen Psikolojisi
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#A07B5B]"></div>
                <Link href="/danismanliklar/ebeveyn-danismanligi" className="text-[#F5F5F5] hover:text-[#A07B5B] transition-colors">
                  Ebeveyn Danışmanlığı
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#A07B5B]"></div>
                <Link href="/danismanliklar/yetiskin-psikolojisi" className="text-[#F5F5F5] hover:text-[#A07B5B] transition-colors">
                  Yetişkin Psikolojisi
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#A07B5B]"></div>
                <Link href="/danismanliklar/online-danismanlik" className="text-[#F5F5F5] hover:text-[#A07B5B] transition-colors">
                  Online Danışmanlık
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Call to Action */}
          <div>
            <h4 className="text-[#F5F5F5] font-serif text-lg font-bold mb-2">Size Yakınız, Bize Yazın</h4>
            <div className="w-12 h-0.5 bg-[#A07B5B] mb-4"></div>
            <div className="space-y-3">
              <a
                href="https://wa.me/+905326499146"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-[#2B2B2B] rounded-lg p-4 hover:bg-[#333333] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#A07B5B] flex items-center justify-center flex-shrink-0">
                  <i className="fab fa-whatsapp text-white text-xl"></i>
                </div>
                <div>
                  <div className="text-[#F5F5F5] text-xs font-sans">WHATSAPP DANIŞMA HATTI</div>
                  <div className="text-[#F5F5F5] font-bold font-sans">+90 532 649 91 46</div>
                </div>
              </a>
              <a
                href="tel:05326499146"
                className="flex items-center space-x-3 bg-[#2B2B2B] rounded-lg p-4 hover:bg-[#333333] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#A07B5B] flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone text-white text-lg"></i>
                </div>
                <div>
                  <div className="text-[#F5F5F5] text-xs font-sans">İLETİŞİM DANIŞMA HATTI</div>
                  <div className="text-[#F5F5F5] font-bold font-sans">+90 532 649 91 46</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#2B2B2B] mt-6 pt-4 text-center text-[#F5F5F5] text-sm font-sans">
          <p className="mb-2">
            &copy; {new Date().getFullYear()}{' '}
            <Link href="/admin" className="hover:text-[#A07B5B] hover:underline transition-colors">
              Emine Yıldırım
            </Link>
            . Tüm hakları saklıdır.
          </p>
          <p>
            <a
              href="https://accstudio.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A07B5B] hover:underline transition-colors"
            >
              accstudio.co
            </a>{' '}
            tarafından hazırlanmıştır.
          </p>
        </div>
      </div>
    </footer>
  )
}

