import { Prisma, PrismaClient } from '@prisma/client'
import closeDb from '../utils/closeDb'

const prisma = new PrismaClient()

const add = async (args: Prisma.TransactionCreateArgs) => {
  try {
    const transaction = await prisma.transaction.create(args)
    await prisma.book.update({
      where: { id: args.data.bookId },
      data: { stock: { decrement: 1 } },
    })
    await prisma.user.update({
      where: { id: args.data.userId },
      data: { numBorrowedBooks: { increment: 1 } },
    })
    if (transaction === null) return false
    return transaction
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const findAll = async (args: Prisma.TransactionFindManyArgs) => {
  try {
    const transactions = await prisma.transaction.findMany(args)
    if (transactions !== null) return transactions
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const findUnique = async (args: Prisma.TransactionFindUniqueArgs) => {
  try {
    const transaction = await prisma.transaction.findUnique(args)
    if (transaction !== null) return transaction
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const update = async (args: Prisma.TransactionUpdateArgs) => {
  try {
    const transaction = await prisma.transaction.update(args)
    if (transaction !== null) return transaction
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const remove = async (args: Prisma.TransactionDeleteManyArgs) => {
  try {
    const transaction = await prisma.transaction.deleteMany(args)
    if (transaction !== null) return transaction
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const countBorrow = async () => {
  try {
    const transaction = await prisma.transaction.count({
      where: { isReturned: { equals: false } },
    })
    if (transaction !== null) return transaction
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const countReturn = async () => {
  try {
    const transaction = await prisma.transaction.count({
      where: { isReturned: { equals: true } },
    })
    if (transaction !== null) return transaction
  } catch (error) {
    return error
  } finally {
    await closeDb(prisma)
  }
}

const countInMonthBorrow = async (gte: string, lt: string) => {
  try {
    const transactionCount = await prisma.transaction.count({
      where: {
        isReturned: { equals: false },
        createdAt: {
          gte: new Date(gte),
          lt: new Date(lt),
        },
      },
    })

    return transactionCount
  } catch (error) {
    console.error('Error counting borrowed books:', error)
    throw error
  } finally {
    await closeDb(prisma)
  }
}

const countInMonthReturn = async (gte: string, lt: string) => {
  try {
    const transactionCount = await prisma.transaction.count({
      where: {
        isReturned: { equals: true },
        createdAt: {
          gte: new Date(gte),
          lt: new Date(lt),
        },
      },
    })

    return transactionCount
  } catch (error) {
    console.error('Error counting returned books:', error)
    throw error
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
  countBorrow,
  countReturn,
  countInMonthBorrow,
  countInMonthReturn,
}
