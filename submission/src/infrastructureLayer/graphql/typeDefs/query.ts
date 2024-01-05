import { gql } from "apollo-server-express";

export const submissionQuery=gql`

type Output{
message:String
}

type Query{
getAssignment:Output
}

`