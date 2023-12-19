import { NextRequest, NextResponse } from 'next/server'
import commentService from '@/services/comment.service'

export async function GET(request: NextRequest) {
  const id = Number(request.nextUrl.searchParams.get('id') as string)
  const data = JSON.parse(request.nextUrl.searchParams.get('data') as string)

  try {
    const response = await commentService.update({
      where: { id },
      data: { ...data, createdAt: new Date(data?.createdAt) },
    })
    console.log({ response }, 'comment')

    if (response) {
      return Response.json(response, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
