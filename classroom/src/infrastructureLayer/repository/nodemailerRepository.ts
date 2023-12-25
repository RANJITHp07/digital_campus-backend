import nodemailer from 'nodemailer';
import INodemailer from '../../usecaseLayer/interface/nodemailerRepository';

class Nodemailer implements INodemailer {



  //to send email for verification
  async sendEmailInvitation( fromEmail:string,toEmail: string, username: string,creator:string,code:string):Promise<string> {
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
    
    
      const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: 'Classroom invitaion',
        html: `
        <div>
          <div style="margin-bottom: 10px">
          🎉 Hello ${username}! You're invited to join an exciting learning adventure! 🚀

          <p style=" margin: 1rem;"><strong>👩‍🏫 Creator:</strong> ${creator}</p>
          <p style="margin: 1rem;"><strong>🏫 Classroom Code:</strong> ${code}</p>
    
🌟 Join now to explore, learn, and connect with your peers. Let the journey begin! 📚✨

See you in class! 🎓
          </div>
        </div>
      ` 
      };

      await transporter.sendMail(mailOptions);
      return  'Email sent'
    } catch (error) {
      throw new Error(`Unable to send email verification email to ${fromEmail}: ${error}`);
    }
  }
 
}

export default Nodemailer;
