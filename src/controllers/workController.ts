import { FastifyReply, FastifyRequest } from "fastify";
import { AppDataSource } from "../db/data-source";
import { Work } from "../db/entity/Work";
import { IWork } from "../interfaces/IWork";
import { User } from "../db/entity/User";

class WorkController {
  async getAllWorks(request: FastifyRequest, reply: FastifyReply) {
    const workRepository = AppDataSource.getRepository(Work);
    const allWorks = await workRepository.find();
    return reply.send(allWorks);
  }

  async createWork(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as IWork;
    const { title, image } = request.body as IWork;
    const workRepository = AppDataSource.getRepository(Work);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });
    if (user === null) {
      return reply.send("No such User!!!");
    }
    if (!user.isAdmin) {
      return reply.send("User is not admin!!!");
    }
    const work = new Work();
    work.userId = userId;
    work.title = title;
    work.image = image;
    await workRepository.save(work);
    return reply.send(work);
  }

  async getOneWork(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as IWork;
    const workRepository = AppDataSource.getRepository(Work);
    const work = await workRepository.findOneBy({ id });
    if (work === null) {
      return reply.send("There is no such work!!!");
    }
    return reply.send(work);
  }

  async destroyWork(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as IWork;
    const workRepository = AppDataSource.getRepository(Work);
    const destroyedWork = await workRepository.delete(id);
    if (destroyedWork.affected === 1) {
      return reply.send("Work successfully deleted!!!");
    }
    if (destroyedWork.affected === 0) {
      return reply.send("There is no such work to delete it!!!");
    }
  }

  async updateWork(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as IWork;
    const { title, image, userId } = request.body as IWork;
    const workRepository = AppDataSource.getRepository(Work);
    const foundWork = await workRepository.findOneBy({ id });
    if (foundWork === null) {
      return reply.send("There is no such work to update!!!");
    }
    foundWork.userId = userId;
    foundWork.title = title;
    foundWork.image = image;
    await workRepository.save(foundWork);
    return reply.send(foundWork);
  }
}
export const workController = new WorkController();
