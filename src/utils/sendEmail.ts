import nodemailer from 'nodemailer'

const template = (code: number) => {
  return `Your code return book is ${code}`
}

export const sendEmail = async (email: string, code: number) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    })

    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Kode Pengembalikan Buku',
      html: template(code),
    })

    console.log('Message sent: %s', info.messageId)
    return { data: info, status: 200 }
  } catch (error) {
    return { data: error, status: 400 }
  }
}
