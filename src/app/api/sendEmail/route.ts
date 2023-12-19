import { sendEmail } from '@/utils/sendEmail'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const response = await sendEmail('sbima2432@gmail.com', 3000)
    console.log({ response })

    if (response) {
      return Response.json({ data: response, status: 200 }, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
