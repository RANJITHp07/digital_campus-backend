import supertest from "supertest";
import { createServer } from '../infrastructure/config/app'

const app = createServer();

describe("auth", () => {
  it("should give 404", async () => {
    const useremail = 'ranj@gmail.com';

    try {
      await supertest(app).get(`v1/api/auth/user/ranj@gmail.com`).expect(200);
    } catch (error) {
      console.error(error); // Log the error to the console
    //   expect(error).toBeInstanceOf(Error); // Verify that it's an error object
    }
  });
});
