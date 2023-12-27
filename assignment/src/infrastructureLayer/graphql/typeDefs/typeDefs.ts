import { assignmentMutation} from "./assignment/mutation";
import { assignmentQuery } from "./assignment/query";
import { gql } from "apollo-server";

export const typeDefs=gql`
  ${assignmentMutation},
  ${assignmentQuery}
`