import { NextRequest, NextResponse } from 'next/server'
import transactionService from '@/services/transaction.service'
import commentService from '@/services/comment.service'
import { sendEmail } from '@/utils/sendEmail'

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id') as string)

  try {
    const response: any = await transactionService.update({
      where: { id },
      include: { User: { select: { email: true } } },
      data: {
        dateReturn: new Date(),
        isReturned: true,
        User: {
          update: {
            numBorrowedBooks: { decrement: 1 },
            numReturnedBooks: { increment: 1 },
          },
        },
      },
    })
    const comment = await commentService.add({
      data: {
        content: '',
        userId: response?.userId,
        Book: { connect: { id: response?.bookId } },
      },
    })
    await sendEmail(response?.User?.id, response?.id)

    console.log({ comment })

    if (id === 0 || response?.code === 'P2025')
      return Response.json({ status: false }, { status: 400 })

    return Response.json({ status: !!response }, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
