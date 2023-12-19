import { NextRequest, NextResponse } from 'next/server'
import userService from '@/services/user.service'
import { validator } from '@/utils/validator'

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name') as string
  const nim = request.nextUrl.searchParams.get('nim') as string
  const alamat = request.nextUrl.searchParams.get('address') as string
  const email = request.nextUrl.searchParams.get('email') as string
  const nohp = request.nextUrl.searchParams.get('phoneNumber') as string
  const password = request.nextUrl.searchParams.get('password') as string

  try {
    const response = await userService.signup({
      name,
      alamat,
      email,
      nim,
      password,
      nohp,
    })

    if (response) {
      return new NextResponse(JSON.stringify(response), { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify(error), { status: 500 })
  }

  // If nothing is returned or resolved, you can return a default response
  return new NextResponse('Internal Server Error', { status: 500 })
}
