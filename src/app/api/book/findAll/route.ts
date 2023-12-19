import { NextRequest, NextResponse } from 'next/server'
import bookService from '@/services/book.service'

export async function GET(request: NextRequest) {
  const take = Number(request.nextUrl.searchParams.get('take') as string)

  try {
    const response = await bookService.findAll({
      take,
      include: { Comment: true },
    })

    if (response) {
      return Response.json(response, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
// [
//   {
//     id: 1,
//     title: 'aads',
//     description: 'dasds',
//     author: 'vdsds',
//     publicationYear: '2334',
//     stock: 10,
//     coverId: '',
//     createdAt: 2023-12-07T07:46:43.000Z
//   },
// ]
