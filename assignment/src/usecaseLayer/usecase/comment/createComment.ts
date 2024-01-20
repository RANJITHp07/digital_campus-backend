import { IComment } from "../../../domainLayer/comments"
import { Response } from "../../interface/Response"
import { ICommentRepository } from "../../interface/commentRepository"

export const createComment=async( commentRepository:ICommentRepository,comment:IComment):Promise<Response>=>{
    try{
      const newComment = await commentRepository.create(comment)
      return {
         message: newComment
      }
    }catch(err){
    throw err
    }
}
