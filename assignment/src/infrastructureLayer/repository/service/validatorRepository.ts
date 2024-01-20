import { isValidObjectId } from 'mongoose';
import { IRequestValidator } from '../../../usecaseLayer/interface/validateRepository';

interface ValidationResult {
    success: boolean;
    message?: string;
}

export class RequestValidator implements IRequestValidator {


    validateRequiredFields(data: Record<string, any>, requiredFields: string[]): ValidationResult {
        for (const field of requiredFields) {
            if (data[field]===undefined) {
                return {
                    success: false,
                    message: `Missing required parameter: ${field}`
                };
            }
            if(field==='id' && !isValidObjectId(data[field])){
                return {
                    success: false,
                    message: `Invalid ObjectId format for parameter: ${field}`
                };
            }

        }

        return { success: true };
    }

}

export default RequestValidator;
