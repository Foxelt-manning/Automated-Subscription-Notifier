import nodemailer from 'nodemailer';
import { Email_Password } from './env.js';

export const accountEmail=`minusahsaaka@gmail.com`
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: accountEmail,
        pass: Email_Password,
    },
});
export default transporter;