import { Prisma, PrismaClient } from '@prisma/client'
import closeDb from '../utils/closeDb'
// import coverService from './cover.service'

const prisma = new PrismaClient()

const add = async (args: Prisma.BookCreateArgs) => {
  try {
    const book = await prisma.book.create(args)
    if (book !== null) return book
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const findAll = async (args: Prisma.BookFindManyArgs) => {
  try {
    const book = await prisma.book.findMany(args)
    console.log({ book })

    if (book !== null) return book
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const findUnique = async (args: Prisma.BookFindUniqueArgs) => {
  try {
    const book = await prisma.book.findUnique(args)
    if (book !== null) return book
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const update = async (args: Prisma.BookUpdateArgs) => {
  try {
    const book = await prisma.book.update(args)
    if (book !== null) return book
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

// const init = async (id: number, data: any) => {
//   const coverId = coverService.add({ data: { coverFile: data?.coverFile } })
//   try {
//     const book = await prisma.book.update(data)
//     if (book !== null) return book
//   } catch (error) {
//     return error
//   } finally {
//     await closeDb(prisma)
//   }
// }

const remove = async (args: Prisma.BookDeleteManyArgs) => {
  try {
    const book = await prisma.book.deleteMany(args)
    if (book !== null) return book
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const count = async () => {
  try {
    const book = await prisma.book.count()
    console.log({ book })

    if (book !== null) return book
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const countInMonth = async (gte: string, lt: string) => {
  try {
    const bookCount = await prisma.book.count({
      where: {
        createdAt: {
          gte: new Date(gte),
          lt: new Date(lt),
        },
      },
    })

    return bookCount
  } catch (error) {
    console.error('Error counting books:', error)
    throw error
  } finally {
    await closeDb(prisma)
  }
}

const isAvaible = async (id: number) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
    })
    if (book === null) return false
    if (book.stock === null) return false
    if (book.stock === 0) return false

    return true
  } catch (error) {
    console.error('Error in isAvailable function:', error)
    return false
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
  countInMonth,
  isAvaible,
  // init,
}
