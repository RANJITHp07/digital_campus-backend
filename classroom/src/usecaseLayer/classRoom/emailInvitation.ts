import { Response } from "../interface/Response";
import { IErrorHandler } from "../interface/errorHandler";
import { INodemailerRepository } from "./../interface/nodemailerRepository";
import { IRequestValidator } from "./../interface/validateRepository";

export const emailInvitation = async (
  nodemailerRepository: INodemailerRepository,
  requestValidator: IRequestValidator,
  errorHandler: IErrorHandler,
    fromEmail: string,
    toEmail: string,
    username: string,
    creator: string,
    code: string,

): Promise<Response> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { fromEmail, toEmail, username, creator, code },
      ["fromEmail", "toEmail", "username", "creator", "code"]
    );

    if (!validation.success) {
      errorHandler.userInputError(validation.message as string);
    }

    const emailinvitation = await nodemailerRepository.sendEmailInvitation(
      fromEmail,
      toEmail,
      username,
      creator,
      code
    );
    return {
      message: emailinvitation,
    };
  } catch (err) {
    throw err;
  }
};
