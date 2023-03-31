import crypto from 'crypto';
import nodemailer from 'nodemailer';


export function randomStringToHash24Bits(inputString: string): string {
    return crypto.createHash('sha256').update(inputString).digest('hex').substring(0, 24);
}


export function sendEmail(to: string | string[], subject: string, body: string, myEmail: string, myPassword: string): void {
    // const myPassword2 = "rermoakzeqrqcdqb";
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: myEmail, // replace with your actual email address
            pass: myPassword // replace with your actual password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: myEmail, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        html: `<p>${body}</p>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}