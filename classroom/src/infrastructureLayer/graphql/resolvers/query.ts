import { authenticate } from "@auth-middlewares/common";
import { errorHandler, controller } from "../injection/injection";

interface MyContext {
  user: any;
}

export const classroomQueries = {
  async getClass(_: unknown, args: { code: string }, context: MyContext) {
    try {
      // checking the authentication
      const user = authenticate(context);
      if (user) {
        const classRoom = await controller.getClass(_, args);
        return classRoom;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async getAllClassroom(_: unknown, args: { id: string }, context: MyContext) {
    try {
      const user = authenticate(context);
      if (user) {
        const classroom = await controller.getAllClassroom(_, args);
        return classroom;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async getCreatorClassroom(
    _: unknown,
    args: { id: string },
    context: MyContext
  ) {
    try {
      const user = authenticate(context);
      if (user) {
        const classroom = await controller.getCreatorClassroom(_, args);
        return classroom;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async getAllClassroomparticipants(
    _: unknown,
    args: { id: string },
    context: MyContext
  ) {
    try {
      // const user = authenticate(context);
      if (true) {
        const classroom = await controller.getAllparticipants(_, args);
        return classroom;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async getclassroom(_: unknown, args: any, context: MyContext) {
    try {
      const user = authenticate(context);
      if (user) {
        const classroom = await controller.getclassroom(_, args);
        return classroom;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async reportedClassroom(_: unknown, args: any, context: MyContext) {
    try {
      const user = authenticate(context);
      if (user) {
        const classroom = await controller.reportedClassroom(_, args);
        return classroom;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async getClassroomDetails(
    _: unknown,
    args: { id: string },
    context: MyContext
  ) {
    try {
      const user = authenticate(context);
      if (user) {
        const classroom = await controller.getClassroomDetails(_, args);
        return classroom;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async getAllTheClassroom(
    _: unknown,
    args: { id: string },
    context: MyContext
  ) {
    try {
      const user = authenticate(context);
      if (user) {
        const classroom = await controller.getAllTheClasroom(_, args);
        return classroom;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async getFilteredClassroom(
    _: unknown,
    args: { id: string; category: string[] },
    context: MyContext
  ) {
    try {
      const user = authenticate(context);
      if (user) {
        const classroom = await controller.getFilteredclassroom(_, args);
        return classroom;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },
};
