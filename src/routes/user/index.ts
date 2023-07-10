import { FastifyPluginAsync } from "fastify";
import { userController } from "../../controllers/userController";

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", userController.getAllUsers);
  fastify.post("/", userController.createUser);
  fastify.get("/:id", userController.getOneUser);
  fastify.delete("/:id", userController.destroyUser);
  fastify.put("/:id", userController.updateUser);
};

export default user;
