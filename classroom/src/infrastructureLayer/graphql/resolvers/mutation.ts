import { IClassroom } from "../../../domainLayer/classroom";
import { errorHandler, controller } from "../injection/injection";
import { authenticate } from "@auth-middlewares/common";
import {Request} from 'express'

interface MyContext {
  user: Request;
}

export const classroomMutation = {
  async createClass(_: unknown, args: { classroom: IClassroom }, context: MyContext) {
    try {
      const user = authenticate(context);
      if (user) {
        const classRoom = await controller.createClass(_, args);
        return classRoom;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async updateClass(
    _: unknown,
    args: { id: string; update: Partial<IClassroom> },
    context: MyContext
  ) {
    try {
      const user = authenticate(context);
      if (user) {
        const updatedClass = await controller.updateClass(_, args);
        return updatedClass;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async deleteClass(_: unknown, args: { id: string }, context: MyContext) {
    try {
      const user = authenticate(context);
      if (user) {
        const deletedClass = await controller.deleteClass(_, args);
        return deletedClass;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async addStudent(
    _: unknown,
    args: { addstudent: { code: string; userId: string } },
    context: MyContext
  ) {
    try {
      const user = authenticate(context);
      if (user) {
        const addstudent = await controller.addStudent(_, args);
        return addstudent;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async deleteStudent(
    _: unknown,
    args: { deletedstudent: { code: string; userId: string } },
    context: MyContext
  ) {
    try {
      const user = authenticate(context);
      if (user) {
        const deletedStudent = await controller.deleteStudent(_, args);
        return deletedStudent;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async addToAdmin(
    _: unknown,
    args: { id: string; classroomId: string },
    context: MyContext
  ) {
    try {
      const user = authenticate(context);
      if (user) {
        const addAdmin = await controller.addToAdmin(_, args);
        return addAdmin;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async removeFromAdmin(
    _: unknown,
    args: { id: string; classroomId: string },
    context: MyContext
  ) {
    try {
      const user = authenticate(context);
      if (user) {
        const addAdmin = await controller.removeFromAdmin(_, args);
        return addAdmin;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async emailInvitation(
    _: unknown,
    args: {
      invitation: {
        fromEmail: string;
        toEmail: string;
        username: string;
        creator: string;
        code: string;
      };
    },
    context: MyContext
  ) {
    try {
      const user = authenticate(context);
      if (user) {
        const inivitation = await controller.emailInviation(_, args);
        return inivitation;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async addRequest(
    _: unknown,
    args: {
      request: { id: string; name: string; code: string; email: string };
    },
    context: MyContext
  ) {
    try {
      const user = authenticate(context);
      if (user) {
        const addUserRequest = await controller.addRequest(_, args);
        return addUserRequest;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },

  async removeRequest(
    _: unknown,
    args: {
      request: { id: string; name: string; code: string; email: string };
    },
    context: MyContext
  ) {
    try {
      const user = authenticate(context);
      if (user) {
        const removeUserRequest = await controller.removeRequest(_, args);
        return removeUserRequest;
      }
    } catch (err) {
      errorHandler.apolloError(err);
    }
  },
};
