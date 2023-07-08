import { User } from "../db/models/models.js";

class UserController {
  async getAllUsers(request, reply) {
    const allUsers = await User.findAndCountAll();
    if (allUsers.rows.length <= 0) {
      return reply.send("Users does not exist yet!!!");
    }
    return reply.send(allUsers);
  }

  async createUser(request, reply) {
    const { email, password, isAdmin } = request.body;
    const createdUser = await User.create({
      email,
      password,
      isAdmin,
    });
    return reply.send(createdUser);
  }

  async getOneUser(request, reply) {
    const { id } = request.params;
    const user = await User.findOne({ where: { id } });
    if (user === null) {
      return reply.send("There is no such user!!!");
    }
    return reply.send(user);
  }

  async destroyUser(request, reply) {
    const { id } = request.params;
    const destroyedUser = await User.destroy({ where: { id } });
    if (destroyedUser === 1) {
      return reply.send("User successfully deleted!!!");
    }
    if (destroyedUser === 0) {
      return reply.send("There is no such user to delete it!!!");
    }
  }

  async updateUser(request, reply) {
    const { id } = request.params;
    const { email, password, isAdmin } = request.body;
    const updatedUser = await User.findOne({ where: { id } });
    if (updatedUser === null) {
      return reply.send("There is no such user to update!!!");
    }
    updatedUser.update({ email, password, isAdmin });
    return reply.send(updatedUser);
  }
}

export const userController = new UserController();
