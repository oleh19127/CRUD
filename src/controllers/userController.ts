import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../db/entity/User";
import { AppDataSource } from "../db/data-source";
import { IUser } from "../interfaces/IUser";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

const generateJwtToken = (id: number, isAdmin: boolean) => {
  const payload = {
    id,
    isAdmin,
  };
  return sign(payload, "SOME TEMPORARY SECRET KEY", { expiresIn: "6h" });
};

class UserController {
  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    const userRepository = AppDataSource.getRepository(User);
    const allUsers = await userRepository.find();
    return reply.send(allUsers);
  }
  async registration(request: FastifyRequest, reply: FastifyReply) {
    const { email, password, isAdmin } = request.body as IUser;
    const userRepository = AppDataSource.getRepository(User);
    const hashPassword = await hash(password, 10);
    const user = new User();
    user.email = email;
    user.password = hashPassword;
    user.isAdmin = isAdmin;
    await userRepository.save(user);
    return reply.send(user);
  }
  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as IUser;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });
    if (user === null) {
      return reply.send("There is no such user!!!");
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return reply.send("Password invalid!!!");
    }
    const token = generateJwtToken(user.id, user.isAdmin);
    return reply.send({ token });
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
