import { FastifyPluginAsync } from "fastify";
import { userController } from "../../controllers/userController";

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", userController.getAllUsers);
  fastify.post("/registration", userController.registration);
  fastify.post("/login", userController.login);
  fastify.delete("/:id", userController.destroyUser);
  fastify.put("/:id", userController.updateUser);
};

export default user;
