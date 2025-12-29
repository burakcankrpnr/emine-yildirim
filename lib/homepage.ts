import { prisma } from './prisma'

export async function getHomepageSettings() {
  let settings = await prisma.homepageSettings.findFirst()

  if (!settings) {
    settings = await prisma.homepageSettings.create({
      data: {},
    })
  }

  return settings
}

