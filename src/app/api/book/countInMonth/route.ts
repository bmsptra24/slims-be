import { NextRequest, NextResponse } from 'next/server'
import bookService from '@/services/book.service'

export async function GET(request: NextRequest) {
  const gte: string = request.nextUrl.searchParams.get('gte') as string
  const lt: string = request.nextUrl.searchParams.get('lt') as string
  console.log({ gte, lt })

  try {
    const response = await bookService.countInMonth(gte, lt)
    if (response) {
      console.log({ response })

      return Response.json(response, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json({ error }, { status: 400 })
  }
}
