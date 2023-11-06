import nodemailer from 'nodemailer';
import INodemailer from '../../usecase/interface/nodemailerRepository';

class Nodemailer implements INodemailer {
  private otps: Map<string, string> = new Map();

  generateOTP():string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  async sendEmailVerification(email: string, username: string,type:boolean):Promise<string> {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
          user: process.env.EMAILID,
          pass: process.env.PASSWORD,
        },
      });

      const otp = this.generateOTP();
      this.otps.set(email, otp);
    
      const mailOptions = {
        from: 'testingjobee007@gmail.com',
        to: email,
        subject: 'Email Verification',
        html:  type ? `
        <div>
          <div style="margin-bottom: 10px">
            Hello ${username}, Welcome to <strong>Digital Campus</strong>! We are excited to have you on board. To get started, please verify your email address:
          </div>
          <div style="width: 75%; margin: 0 auto; background-color: black; color: white; padding: 4px; font-size: 3rem; text-align: center;">
            <strong style="text">${otp}</strong>
          </div>
        </div>
      ` : `<div>
      <div style="margin-bottom: 10px">
      Hello and welcome to the <strong>Digital Campus</strong>! We are thrilled to have you on board as an admin. Your unique admin ID is a key to access and manage our platform. Please ensure you keep it safe and secure.
      </div>
      <div style="width: 75%; margin: 0 auto; background-color: black; color: white; padding: 4px; font-size: 3rem; text-align: center;">
        <strong style="text">${email.slice(0,3)+otp.slice(0,3)}</strong>
      </div>
    </div>`
      };

      await transporter.sendMail(mailOptions);
      return 'Email sent';
    } catch (error) {
      throw new Error(`Unable to send email verification email to ${email}: ${error}`);
    }
  }

  async verifyEmail(enteredOTP: string, email: string):Promise<string> {
    try {
      const expectedOTP = this.otps.get(email);
      if (expectedOTP === enteredOTP) {
        this.otps.delete(email);
        return 'Successfully logged in';
      } else {
        return 'The OTP entered is incorrect';
      }
    } catch (error) {
      throw new Error("Wrong otp");
    }
  }
}

export default Nodemailer;
