class NotesController {
  async create(request, response) {
    const { user_id } = request.params;

    return response.json(user_id);
  }
}

module.exports = NotesController;
