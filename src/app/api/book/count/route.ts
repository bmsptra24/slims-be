import { NextRequest, NextResponse } from 'next/server'
import bookService from '@/services/book.service'

export async function GET(request: NextRequest) {
  try {
    const response = await bookService.count()
    if (response) {
      console.log({ response })

      return Response.json(response, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json({ error }, { status: 400 })
  }
}
