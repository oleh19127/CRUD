import { FastifyPluginAsync } from "fastify";
import { workController } from "../../controllers/workController";

const work: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", workController.getAllWorks);
  fastify.post("/:userId", workController.createWork);
  fastify.get("/:id", workController.getOneWork);
  fastify.delete("/:id", workController.destroyWork);
  fastify.put("/:id", workController.updateWork);
};

export default work;
