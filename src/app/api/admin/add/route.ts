import { NextRequest, NextResponse } from 'next/server'
import adminService from '@/services/admin.service'

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name') as string
  const email = request.nextUrl.searchParams.get('email') as string
  const password = request.nextUrl.searchParams.get('password') as string
  const randomId = Math.floor(1000 + Math.random() * 9000)

  try {
    const response = await adminService.add({
      data: {
        id: randomId.toString(),
        name,
        email,
        password,
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
