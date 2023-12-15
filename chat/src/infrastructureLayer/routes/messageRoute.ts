import express,{Request,Response,NextFunction} from 'express';
import chatAdapter from './injection/injection'

const route=express.Router();

route.get('/:id',(req: Request, res: Response, next: NextFunction) => chatAdapter.getMessage(req,res,next))

export default route;
