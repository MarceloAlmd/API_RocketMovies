const knex = require("../database/knex");
const AppError = require("../utils/appError");
class NotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    const [note_id] = await knex("notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        user_id,
        name,
      };
    });

    await knex("tags").insert(tagsInsert);

    return response.json({
      message: "note created",
    });
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    if (!note) {
      throw new AppError("note not found");
    }

    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    return response.json({
      ...note,
      tags,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.json({
      message: "note deleted",
    });
  }
}

module.exports = NotesController;
