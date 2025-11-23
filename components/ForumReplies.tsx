'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' // @ts-ignore
import { z } from 'zod'

const replySchema = z.object({
  content: z.string().min(10, 'Yorum en az 10 karakter olmalıdır'),
})

type ReplyFormData = z.infer<typeof replySchema>

interface Reply {
  id: string
  content: string
  author: { name: string }
  createdAt: Date
}

export default function ForumReplies({
  topicId,
  initialReplies,
}: {
  topicId: string
  initialReplies: Reply[]
}) {
  const [replies, setReplies] = useState(initialReplies)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReplyFormData>({
    resolver: zodResolver(replySchema),
  })

  const onSubmit = async (data: ReplyFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/forum/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId, content: data.content }),
      })

      if (response.ok) {
        const newReply = await response.json()
        setReplies([...replies, newReply])
        reset()
      }
    } catch (error) {
      console.error('Yorum gönderme hatası:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-primary-dark mb-6">
        Yorumlar ({replies.length})
      </h2>
      <div className="space-y-6 mb-8">
        {replies.map((reply) => (
          <div key={reply.id} className="border-b border-primary-light pb-4">
            <div className="flex justify-between items-start mb-2">
              <p className="font-semibold text-primary-dark">{reply.author.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(reply.createdAt).toLocaleDateString('tr-TR')}
              </p>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-primary-dark font-semibold mb-2">
            Yorumunuz
          </label>
          <textarea
            {...register('content')}
            id="content"
            rows={4}
            className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition font-semibold disabled:opacity-50"
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Yorum Yap'}
        </button>
      </form>
    </div>
  )
}

