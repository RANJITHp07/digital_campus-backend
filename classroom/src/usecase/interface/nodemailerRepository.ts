interface INodemailerRepository{
    sendEmailInvitation( fromEmail:string,toEmail: string, username: string,creator:string,code:string):Promise<string>
}

export default INodemailerRepository