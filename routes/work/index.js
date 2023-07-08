import { workController } from "../../controllers/workController.js";

export default async function (fastify, opts) {
  fastify.get("/", workController.getAllWorks);
  fastify.post("/:id", workController.createWork);
  fastify.delete("/:id", workController.destroyWork);
  fastify.get("/:id", workController.getOneWork);
  fastify.put("/:id", workController.updateWork);
}
