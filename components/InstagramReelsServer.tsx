import { prisma } from '@/lib/prisma'
import InstagramReels from './InstagramReels'

// Reels verisinin her istekte güncel gelmesi için dinamik render
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function InstagramReelsServer() {
  const reels = await prisma.instagramReel.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })

  if (reels.length === 0) {
    return null
  }

  return <InstagramReels reels={reels} />
}









