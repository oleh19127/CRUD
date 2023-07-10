import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../db/entity/User";
import { AppDataSource } from "../db/data-source";
import { IUser } from "../interfaces/IUser";

class UserController {
  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    const userRepository = AppDataSource.getRepository(User);
    const allUsers = await userRepository.find();
    return reply.send(allUsers);
  }
  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const { email, password, isAdmin } = request.body as IUser;
    const userRepository = AppDataSource.getRepository(User);
    const user = new User();
    user.email = email;
    user.password = password;
    user.isAdmin = isAdmin;
    await userRepository.save(user);
    return reply.send(user);
  }
  async getOneUser(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as IUser;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    if (user === null) {
      return reply.send("There is no such user!!!");
    }
    return reply.send(user);
  }
  async destroyUser(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as IUser;
    const userRepository = AppDataSource.getRepository(User);
    const destroyedUser = await userRepository.delete(id);
    if (destroyedUser.affected === 1) {
      return reply.send("User successfully deleted!!!");
    }
    if (destroyedUser.affected === 0) {
      return reply.send("There is no such user to delete it!!!");
    }
  }

  async updateUser(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as IUser;
    const { email, password, isAdmin } = request.body as IUser;
    const userRepository = AppDataSource.getRepository(User);
    const foundUser = await userRepository.findOneBy({ id });
    if (foundUser === null) {
      return reply.send("There is no such user to update!!!");
    }
    foundUser.isAdmin = isAdmin;
    foundUser.email = email;
    foundUser.password = password;
    await userRepository.save(foundUser);
    return reply.send(foundUser);
  }
}

export const userController = new UserController();
