import { NextRequest, NextResponse } from 'next/server'
import bookService from '@/services/book.service'

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id') as string)

  try {
    const response = await bookService.isAvaible(id)

    return Response.json({ status: response }, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
