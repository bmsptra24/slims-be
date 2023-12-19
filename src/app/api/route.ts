import { NextRequest, NextResponse } from 'next/server'
import userService from '@/services/user.service'

export async function GET(request: NextRequest) {
  return Response.json('The sistem running!')
}
