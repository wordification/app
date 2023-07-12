import * as nodemailer from 'nodemailer'

type Options = {
  to: string | string[]
  subject: string
  text: string
  html: string
}

export async function sendEmail({ to, subject, text, html }: Options) {
  console.log('Sending email to:', to)

  // create reusable transporter object using SendInBlue for SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'wordification.development@gmail.com',
      pass: process.env.EMAIL_SECRET,
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Wordification Development Team" <wordification.development@gmail.com>',
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  })

  return info
}
