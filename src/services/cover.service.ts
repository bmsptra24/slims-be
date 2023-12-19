// import { Prisma, PrismaClient } from '@prisma/client'
// import closeDb from '../utils/closeDb'

// const prisma = new PrismaClient()

// const add = async (args: Prisma.CoverCreateArgs) => {
//   try {
//     const cover = await prisma.cover.create(args)
//     if (cover !== null) return cover
//   } catch (error) {
//     return error
//   } finally {
//     await closeDb(prisma)
//   }
// }

// const method = { add }
// export default method
