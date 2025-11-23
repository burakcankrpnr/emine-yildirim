'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' // @ts-ignore
import { z } from 'zod'
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa'
import Image from 'next/image'

const loginSchema = z.object({
  email: z.string().email('Geçerli bir email adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLogin() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsRedirecting(true)
        // Kısa bir gecikme ile loading ekranını göster
        setTimeout(() => {
          router.push('/admin')
        }, 500)
      } else {
        const result = await response.json()
        setError(result.message || 'Giriş başarısız')
        setIsLoading(false)
      }
    } catch (error) {
      setError('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  // Loading ekranı (yönlendirme sırasında)
  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-primary-lighter py-10 py-10 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6 animate-pulse">
            <Image
              src="/emine-yildirim.png"
              alt="Emine Yıldırım Psikolog"
              width={200}
              height={200}
              className="mx-auto"
              priority
            />
          </div>
          <p className="text-primary-dark text-lg font-semibold">Yönlendiriliyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-lighter py-10 py-10 py-6 md:py-10 px-4 flex items-center justify-center">
      <div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-light p-4 rounded-full">
              <FaLock className="text-3xl md:text-4xl text-primary-dark" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark mb-2">
            Admin Girişi
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Yönetim paneline erişmek için giriş yapın
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="email" className="block text-primary-dark font-semibold mb-2 text-sm md:text-base">
              Email Adresi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400 text-sm md:text-base" />
              </div>
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="ornek@email.com"
                className="w-full pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                <span>•</span>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-primary-dark font-semibold mb-2 text-sm md:text-base">
              Şifre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 text-sm md:text-base" />
              </div>
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Şifrenizi giriniz"
                className="w-full pl-10 pr-12 py-2 md:py-3 text-sm md:text-base border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary-dark transition"
                aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-sm md:text-base" />
                ) : (
                  <FaEye className="text-sm md:text-base" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                <span>•</span>
                {errors.password.message}
              </p>
            )}
          </div>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 md:p-4 rounded-lg text-sm md:text-base flex items-start gap-2">
              <span className="font-bold">⚠</span>
              <span>{error}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 md:py-3.5 bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition font-semibold text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                <span>Giriş yapılıyor...</span>
              </span>
            ) : (
              'Giriş Yap'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

