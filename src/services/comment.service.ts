import { Prisma, PrismaClient } from '@prisma/client'
import closeDb from '../utils/closeDb'

const prisma = new PrismaClient()

const add = async (args: Prisma.CommentCreateArgs) => {
  try {
    const comment = await prisma.comment.create(args)
    if (comment !== null) return comment
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const findAll = async (args: Prisma.CommentFindManyArgs) => {
  try {
    const comments = await prisma.comment.findMany(args)
    if (comments !== null) return comments
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const findUnique = async (args: Prisma.CommentFindUniqueArgs) => {
  try {
    const comment = await prisma.comment.findUnique(args)
    if (comment !== null) return comment
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const update = async (args: Prisma.CommentUpdateArgs) => {
  try {
    const comment = await prisma.comment.update(args)
    if (comment !== null) return comment
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const remove = async (args: Prisma.CommentDeleteManyArgs) => {
  try {
    const comment = await prisma.comment.deleteMany(args)
    if (comment !== null) return comment
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const count = async () => {
  try {
    const comment = await prisma.comment.count()
    if (comment !== null) return comment
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

export default { add, findAll, findUnique, update, remove, count }
