import { NextRequest, NextResponse } from 'next/server'
import adminService from '@/services/admin.service'

export async function GET(request: NextRequest) {
  const take = Number(request.nextUrl.searchParams.get('take') as string)
  const orderBy = JSON.parse(
    request.nextUrl.searchParams.get('orderBy') as string,
  )

  try {
    const response = await adminService.findAll({ take, orderBy })
    if (response) {
      return Response.json(response, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
