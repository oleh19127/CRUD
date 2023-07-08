import { userController } from "../../controllers/userController.js";

export default async function (fastify, opts) {
  fastify.get("/", userController.getAllUsers);
  fastify.post("/", userController.createUser);
  fastify.delete("/:id", userController.destroyUser);
  fastify.get("/:id", userController.getOneUser);
  fastify.put("/:id", userController.updateUser);
}
