import { NextRequest, NextResponse } from 'next/server'
import commentService from '@/services/comment.service'

export async function GET(request: NextRequest) {
  const take = Number(request.nextUrl.searchParams.get('take') as string)
  const userId = request.nextUrl.searchParams.get('userId') as string

  try {
    const response = await commentService.findAll({ take, where: { userId } })
    if (response) {
      return Response.json(response, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
