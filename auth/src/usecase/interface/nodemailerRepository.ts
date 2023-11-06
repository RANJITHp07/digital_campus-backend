interface INodemailerRepository{
    generateOTP(email:string):string
    sendEmailVerification(email: string, username: string,type:boolean):Promise<string>
    verifyEmail(enteredOTP: string, email: string):Promise<string>
}

export default INodemailerRepository