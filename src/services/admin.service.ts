import { Prisma, PrismaClient } from '@prisma/client'
import closeDb from '../utils/closeDb'

const prisma = new PrismaClient()

const add = async (args: Prisma.AdminCreateArgs) => {
  try {
    const admin = await prisma.admin.create(args)
    if (admin !== null) return admin
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const findAll = async (args: Prisma.AdminFindManyArgs) => {
  try {
    const admins = await prisma.admin.findMany(args)
    if (admins !== null) return admins
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const findUnique = async (args: Prisma.AdminFindUniqueArgs) => {
  try {
    const admin = await prisma.admin.findUnique(args)
    if (admin !== null) return admin
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const update = async (args: Prisma.AdminUpdateArgs) => {
  try {
    const admin = await prisma.admin.update(args)
    if (admin !== null) return admin
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const remove = async (args: Prisma.AdminDeleteManyArgs) => {
  try {
    const admin = await prisma.admin.deleteMany(args)
    if (admin !== null) return admin
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const count = async () => {
  try {
    const admin = await prisma.admin.count()
    if (admin !== null) return admin
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

export default {
  add,
  findAll,
  findUnique,
  update,
  remove,
  count,
}
