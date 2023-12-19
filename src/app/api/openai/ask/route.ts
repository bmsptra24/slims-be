import { NextRequest, NextResponse } from 'next/server'
import openaiService from '@/services/openai.service'

export async function GET(request: NextRequest) {
  const question = request.nextUrl.searchParams.get('question') as string
  console.log({ question })

  try {
    const response = await openaiService.get(question)

    if (response) {
      return Response.json({ data: response, status: 200 }, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
