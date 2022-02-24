import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const followUser = async (followerId: string, followingId: string) => {
  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId
      }
    }
  })

  if (existingFollow) {
    throw new createError.BadRequest('Vous suivez déjà cet utilisateur')
  }

  return prisma.follow.create({
    data: {
      followerId,
      followingId
    }
  })
}

export const unfollowUser = async (followerId: string, followingId: string) => {
  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId
      }
    }
  })

  if (!existingFollow) {
    throw new createError.NotFound('Vous ne suivez pas cet utilisateur')
  }

  return prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId
      }
    }
  })
}