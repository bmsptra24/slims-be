import { NextRequest, NextResponse } from 'next/server'
import bookService from '@/services/book.service'

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id') as string)
  const data = JSON.parse(request.nextUrl.searchParams.get('data') as string)

  try {
    const response = await bookService.update({ where: { id }, data })
    if (response) {
      console.log({ response })

      return Response.json(response, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
