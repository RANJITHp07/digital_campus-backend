import { submissionMutation } from "./mutation";
import {submissionQuery } from "./query";
import { gql } from "apollo-server";

export const typeDefs=gql`
  ${submissionMutation},
  ${submissionQuery}
`