import { UserRepository } from "../../repository/queries/userRepository";
import { Userusecase } from "../../../usecaseLayer/usecase/userusecase";
import Encrypt from "../../repository/services/bcryptRepository";
import { UserAdapter } from "../../../adapterLayer/userAdapter";
import { Users } from "../../entities/user";
import jwtPassword from "../../repository/services/jwtRepository";
import Nodemailer from "../../repository/services/nodemailer";
import Publisher from "../../repository/rabbitmq/publishrepository";
import Listener from "../../repository/rabbitmq/listenrepository";
import RequestValidator from "../../repository/services/validatorRepository";


// factory pattern 
const userRepository = new UserRepository(Users);
const bcrypt=new Encrypt()
const jwt=new jwtPassword()
const nodemailer=new Nodemailer()
const publisher=new Publisher()
const listener=new Listener()
const requestValidator=new RequestValidator()
const userusecase=new Userusecase(userRepository,bcrypt,jwt,nodemailer,publisher,listener,requestValidator);
const useradapter=new UserAdapter(userusecase);

export default useradapter