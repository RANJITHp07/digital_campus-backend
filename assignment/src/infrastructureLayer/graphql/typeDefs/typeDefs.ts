import { assignmentMutation} from "./mutation";
import { assignmentQuery } from "./query";
import { gql } from "apollo-server";

export const typeDefs=gql`
  ${assignmentMutation},
  ${assignmentQuery}
`