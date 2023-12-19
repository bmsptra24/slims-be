import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Import module 'stream'
import { Readable } from 'stream'

const prisma = new PrismaClient()

interface TBody {
  title: string
  author: string
  publicationYear: string
  stock: number
  linkPdf: string
  cover: string
  description: string
}

// Fungsi untuk mengonsumsi ReadableStream
async function consumeStream(stream: ReadableStream<Uint8Array>) {
  const reader: ReadableStreamDefaultReader<Uint8Array> = stream.getReader()
  const chunks: Uint8Array[] = []

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      chunks.push(value)
    }

    return Buffer.concat(chunks).toString('utf-8')
  } finally {
    reader.releaseLock()
  }
}

export async function POST(request: NextRequest) {
  try {
    // Mengonsumsi ReadableStream dan mendapatkan data
    const bodyData = await consumeStream(request.body as any)
    const body: TBody = JSON.parse(bodyData)

    console.log('Request Body:', body)

    const {
      title,
      author,
      publicationYear,
      stock,
      linkPdf,
      cover,
      description,
    } = body

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        publicationYear,
        stock,
        linkPdf,
        cover,
        description,
      },
    })

    return NextResponse.json({ success: true, data: newBook }, { status: 201 })
  } catch (error) {
    console.error('Error adding book:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
