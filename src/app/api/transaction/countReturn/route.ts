import { NextRequest, NextResponse } from 'next/server'
import transactionService from '@/services/transaction.service'

export async function GET(request: NextRequest) {
  try {
    const response = await transactionService.countReturn()
    if (response) {
      console.log({ response })

      return Response.json(response, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json({ error }, { status: 400 })
  }
}
