import { User, Work } from "../db/models/models.js";

class WorkController {
  async getAllWorks(request, reply) {
    const allWorks = await Work.findAndCountAll();
    if (allWorks.rows.length <= 0) {
      return reply.send("Works does not exist yet!!!");
    }
    return reply.send(allWorks);
  }

  async createWork(request, reply) {
    const { userId } = request.params;
    const { image, title } = request.body;
    const user = await User.findOne({ where: { id: userId } });
    if (user.isAdmin === true) {
      const work = await Work.create({
        image,
        title,
        userId,
      });
      return reply.send(work);
    } else {
      return reply.send("User not admin");
    }
  }

  async destroyWork(request, reply) {
    const { id } = request.params;
    const destroyedWork = await Work.destroy({ where: { id } });
    if (destroyedWork === 1) {
      return reply.send("Works successfully deleted!!!");
    }
    if (destroyedWork === 0) {
      return reply.send("There is no such work to delete it!!!");
    }
  }

  async getOneWork(request, reply) {
    const { id } = request.params;
    const work = await Work.findOne({ where: { id } });
    if (work === null) {
      return reply.send("There is no such work!!!");
    }
    return reply.send(work);
  }

  async updateWork(request, reply) {
    const { id } = request.params;
    const { image, title } = request.body;
    const updatedWork = await Work.findOne({ where: { id } });
    if (updatedWork === null) {
      return reply.send("There is no such work to update!!!");
    }
    updatedWork.update({ image, title });
    return reply.send(updatedWork);
  }
}

export const workController = new WorkController();
