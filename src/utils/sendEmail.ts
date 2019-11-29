import * as nodemailer from 'nodemailer';
import { SENDGRID_USERNAME, SENDGRID_API_KEY } from 'src/constants';

export const sendEmail = async (email: string, message:string, name:string) => {

  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_API_KEY
    }
  });

  let info = await transporter.sendMail({
    from: '"Richany Nguon" <admin@richanynguon.com>',
    to: email,
    subject: "Thank you for taking the time to reach out",
    text: "Hello!",
    html: `<p>Hello ${name},</p><p>I hope you enjoyed looking through my first project using the react, typescript, nest, graphql, and apollo stack! I am happy to hear you would like to connect. I just wanted to let you I did recieve your email and will response once I review your message. For now enjoy a picture of my dog who is happy to see you as well! Sending you all the best energy!</p><p>warm regards,</p><p>Richany Nguon and Baloo</p><img src='https://i.imgur.com/ANljkMP.gif'alt='dog being super happy'> <br/><br/><p>Your message:</p><br/><p>${message}</p>`
  });

  console.log("Message sent: %s", info.messageId);


}