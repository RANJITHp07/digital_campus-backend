import { PaymentAdapter } from "../../../adapterLayer/paymentAdapter";
import { PaymentUsecase } from "../../../usecaseLayer/usecase/paymentusecase";
import { PaymentRepository } from "../../repository/services/paymentRepository";
import RequestValidator from "../../repository/services/validatorRepository";



const repository=new PaymentRepository('','');
const validator=new RequestValidator()
const usecase=new PaymentUsecase(repository,validator);
const controller=new PaymentAdapter(usecase);

export default controller