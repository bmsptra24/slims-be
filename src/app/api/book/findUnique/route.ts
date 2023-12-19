import { NextRequest, NextResponse } from 'next/server'
import bookService from '@/services/book.service'

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id') as string)

  try {
    const response = await bookService.findUnique({
      where: { id },
      select: {
        id: true,
        author: true,
        cover: true,
        createdAt: true,
        description: true,
        publicationYear: true,
        linkPdf: true,
        stock: true,
        title: true,
        Comment: true,
      },
    })
    if (response) {
      return Response.json(response, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
