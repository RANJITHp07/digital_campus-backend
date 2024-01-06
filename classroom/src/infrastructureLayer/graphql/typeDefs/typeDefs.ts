import { classRoomMutation } from "./mutation";
import { classroomQuery } from "./query";
import { gql } from "apollo-server";

export const typeDefs = gql`
  ${classRoomMutation},
  ${classroomQuery}
`;
