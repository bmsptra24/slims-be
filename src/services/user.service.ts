import { Prisma, PrismaClient } from '@prisma/client'
import closeDb from '../utils/closeDb'

const prisma = new PrismaClient()

const findAll = async (args: Prisma.UserFindManyArgs) => {
  try {
    const user = await prisma.user.findMany(args)
    console.log({ user })

    if (user !== null) return user
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const add = async (args: Prisma.UserCreateArgs) => {
  try {
    const user = await prisma.user.create(args)
    if (user !== null) return user
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const signin = async (nim: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { nim, password } })
    if (user !== null) return { data: user, status: 200, category: 'member' }

    const admin = await prisma.admin.findUnique({
      where: { email: nim, password },
    })
    if (admin !== null) return { data: admin, status: 200, category: 'admin' }

    return { data: 'User not found!', status: 400 }
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const signup = async (data: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.create({ data })
    if (user !== null) return { data: user, status: 200 }
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const count = async () => {
  try {
    const user = await prisma.user.count()
    if (user !== null) return user
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const countInMonth = async (gte: string, lt: string) => {
  try {
    const userCount = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(gte),
          lt: new Date(lt),
        },
      },
    })

    return userCount
  } catch (error) {
    console.error('Error counting users:', error)
    throw error
  } finally {
    await closeDb(prisma)
  }
}

const remove = async (args: Prisma.UserDeleteManyArgs) => {
  try {
    const user = await prisma.user.deleteMany(args)
    if (user !== null) return user
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const findUnique = async (args: Prisma.UserFindUniqueArgs) => {
  try {
    const user = await prisma.user.findUnique(args)
    if (user !== null) return user
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

export default {
  signin,
  signup,
  count,
  countInMonth,
  add,
  findAll,
  findUnique,
  remove,
}
