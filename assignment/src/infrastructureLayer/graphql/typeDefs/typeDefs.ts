import { assignmentMutation} from "./assignment/mutation";
import { assignmentQuery } from "./assignment/query";
import { gql } from "apollo-server";
import { commentMutation } from "./comment/mutation";
import { commentQuery } from "./comment/query";


export const typeDefs=gql`
  ${assignmentMutation},
  ${assignmentQuery},
  ${commentMutation},
  ${commentQuery}
`