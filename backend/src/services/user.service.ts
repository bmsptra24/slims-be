import { Prisma, PrismaClient } from '@prisma/client'
import closeDb from '../utils/closeDb'

const prisma = new PrismaClient()

const signin = async (nim: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { nim, password } })
    if (user !== null) return user

    const admin = await prisma.admin.findUnique({
      where: { email: nim, password },
    })
    if (admin !== null) return admin

    return 'User not found!'
  } catch (error) {
    return error
  }
}

const signup = async (data: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.create({ data })
    if (user !== null) return user
  } catch (error) {
    return error
  }
}

closeDb(prisma)

export default { signin, signup }
