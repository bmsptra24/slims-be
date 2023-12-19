import { NextRequest, NextResponse } from 'next/server'
import transactionService from '@/services/transaction.service'
import { Prisma } from '@prisma/client'
import { sendEmail } from '@/utils/sendEmail'

export async function GET(request: NextRequest) {
  const isReturned = false
  const dateBorrow = new Date()
  const dateReturn = new Date(
    request.nextUrl.searchParams.get('dateReturn') as string,
  )
  const userId = request.nextUrl.searchParams.get('userId') as string
  const bookId = Number(request.nextUrl.searchParams.get('bookId') as string)

  if (userId === '' || bookId === 0)
    return Response.json({ status: false }, { status: 400 })

  try {
    const response: any = await transactionService.add({
      include: { User: { select: { email: true } } },
      data: {
        isReturned,
        dateBorrow,
        dateReturn,
        userId,
        bookId,
      },
    })
    await sendEmail(response?.User?.id, response?.id)

    return Response.json({ status: !!response }, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
