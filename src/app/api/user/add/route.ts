import { NextRequest, NextResponse } from 'next/server'
import userService from '@/services/user.service'

export async function GET(request: NextRequest) {
  const name = (request.nextUrl.searchParams.get('name') as string) || ''
  const email = (request.nextUrl.searchParams.get('email') as string) || ''
  const nim = (request.nextUrl.searchParams.get('nim') as string) || ''
  const alamat = (request.nextUrl.searchParams.get('alamat') as string) || ''
  const nohp = (request.nextUrl.searchParams.get('nohp') as string) || ''
  const password =
    (request.nextUrl.searchParams.get('password') as string) || ''
  const numBorrowedBooks = 0
  const numReturnedBooks = 0
  const randomId = Math.floor(1000 + Math.random() * 9000)
  try {
    const userResponse = await userService.add({
      data: {
        id: randomId.toString(),
        name,
        email,
        nim,
        alamat,
        nohp,
        password,
        numBorrowedBooks,
        numReturnedBooks,
      },
    })

    console.log({ userResponse })

    if (userResponse) {
      return Response.json(userResponse, { status: 200 })
    }
  } catch (error) {
    console.error(error)
    return Response.json(error, { status: 400 })
  }
}
