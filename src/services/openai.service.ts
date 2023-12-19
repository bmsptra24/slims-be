import { OpenAI } from 'langchain/llms/openai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { HumanMessage } from 'langchain/schema'
import bookService from '@/services/book.service'

const get = async (question: string) => {
  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.1,
  })

  const data = await bookService.findAll({
    select: {
      title: true,
      description: true,
      author: true,
      publicationYear: true,
      stock: true,
    },
  })

  const messages = [
    new HumanMessage({
      content: `This is books data that you can use to answer this question. data: ${JSON.stringify(
        data,
      )}. question: ${question}`,
    }),
  ]
  console.log({ messages })

  const chatModelResult = await chatModel.predictMessages(messages)

  return chatModelResult.content
}

const method = { get }
export default method
