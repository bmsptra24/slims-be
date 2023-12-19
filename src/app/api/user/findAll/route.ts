import { NextRequest, NextResponse } from 'next/server'
import userService from '@/services/user.service'

export async function GET(request: NextRequest) {
  const take = Number(request.nextUrl.searchParams.get('take') as string)

  try {
    const response = await userService.findAll({ take })

    console.log({ response })
    if (response) {
      return Response.json(response, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return Response.json(error, { status: 400 })
  }
}
// [
//   {
//     id: 1,
//     title: 'aads',
//     description: 'dasds',
//     author: 'vdsds',
//     publicationYear: '2334',
//     stock: 10,
//     coverId: '',
//     createdAt: 2023-12-07T07:46:43.000Z
//   },
//   {
//     id: 2,
//     title: 'uaaa',
//     description: 'sdsds',
//     author: 'sdsds',
//     publicationYear: '2333',
//     stock: 10,
//     coverId: '',
//     createdAt: 2023-12-07T07:46:43.000Z
//   }
// ]
