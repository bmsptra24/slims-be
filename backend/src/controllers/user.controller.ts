import { NextFunction, Request, Response } from 'express'
import userService from '../services/user.service'
import { validator } from '../utils/validator'

const signin = async (req: Request, res: Response) => {
  const nim: string = req.query.nim as string
  const password: string = req.query.password as string

  try {
    const response = await userService.signin(nim, password)
    if (response) {
      return res.json(response).status(200)
    }
  } catch (error) {
    console.log(error)
    return res.json(error).status(400)
  }
}

const signup = async (req: Request, res: Response) => {
  const name = req.query.name as string
  const nim = req.query.nim as string
  const alamat = req.query.alamat as string
  const confirmPassword = req.query.confirmPassword as string
  const email = req.query.email as string
  const nohp = req.query.nohp as string
  const password = req.query.password as string

  const isValid = validator({ password, confirmPassword })
  if (isValid.status === 'invalid') return isValid.description

  try {
    const response = await userService.signup({
      name,
      alamat,
      email,
      nim,
      password,
      nohp,
    })
    console.log({ response })

    if (response) {
      return res.json(response)
    }
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
}

export default { signin, signup }
