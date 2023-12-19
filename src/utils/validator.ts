interface TValidator {
  password: string
  confirmPassword: string
}

export const validator = (props: TValidator) => {
  const { password, confirmPassword } = props
  if (password !== confirmPassword)
    return { status: 'invalid', description: 'Password invalid!' }

  return { status: 'valid' }
}
