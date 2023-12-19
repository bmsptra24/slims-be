import { NextRequest, NextResponse } from 'next/server'
import transactionService from '@/services/transaction.service'

export async function GET(request: NextRequest) {
  const take = Number(request.nextUrl.searchParams.get('take') as string)

  try {
    const response = await transactionService.findAll({
      take,
      select: {
        isReturned: true,
        dateReturn: true,
        createdAt: true,
        userId: true,
        Book: {
          select: {
            title: true,
            description: true,
            author: true,
            publicationYear: true,
          },
        },
      },
    })
    console.log({ response }, 'hii')

    if (response) {
      return Response.json(response, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
