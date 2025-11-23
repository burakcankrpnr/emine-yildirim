'use client'

export default function Counter() {
  const stats = [
    {
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
        </svg>
      ),
      value: "8 yıl",
      label: ["AKADEMİK", "EĞİTİM"]
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 2v6h6" />
        </svg>
      ),
      value: "25 Adet",
      label: ["AKADEMİK", "MAKALE"]
    },
    {
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
        </svg>
      ),
      value: "18 Alanda",
      label: ["DEĞERLENDİRME", "VE TESTLER"]
    },
    {
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 21h18v-2H3v2zM21 8h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H3v2h18V8zM9 5h6v3H9V5zM3 13h18v2H3v-2z"/>
        </svg>
      ),
      value: "7+",
      label: ["MESLEKİ", "EĞİTİMLER"]
    }
  ]

  return (
    <section 
      className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6"
      style={{
        backgroundImage: 'url(/leaves-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f8f5f0'
      }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative">
              {/* Stat Content */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                {/* Icon */}
                <div className="text-[#a06e4e] flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                    {stat.icon}
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col min-w-0">
                  {/* Value */}
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#a06e4e] leading-tight">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="space-y-0">
                    <div className="text-[10px] sm:text-xs md:text-sm font-normal uppercase tracking-wide text-[#888888] leading-tight">
                      {stat.label[0]}
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm font-normal uppercase tracking-wide text-[#888888] leading-tight">
                      {stat.label[1]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator - Vertical dotted line with circle in the middle */}
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute top-0 right-0 h-full" style={{ width: '1px' }}>
                  {/* Dotted line - full height */}
                  <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2" style={{
                    borderLeft: '2px dotted #a06e4e',
                    opacity: 0.6,
                    height: '100%'
                  }}></div>
                  {/* Circle - centered on the line */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#a06e4e]"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-[#a47355]"></div>
    </section>
  )
}

