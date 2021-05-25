import client from "../client";

export default {
  createMovie: (root, { title, year, genre }, context, info) =>
    client.coffee.create({ data: { title, year, genre } }),

  deleteMovie: (root, { id }, context, info) =>
    client.coffee.delete({ where: { id } }),

  updateMovie: (root, { id, year }, contexdt, info) =>
    client.coffee.update({ where: { id }, data: { year } }),
};
