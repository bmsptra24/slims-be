import { NextRequest, NextResponse } from 'next/server'
import adminService from '@/services/admin.service'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id') as string

  try {
    const response = await adminService.findUnique({ where: { id } })
    if (response) {
      return Response.json(response, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
