const path = require("path");
const fs = require("fs");
const uploadsConfig = require("../configs/uploads");

class DiskStorage {
  async saveFile(filename) {
    await fs.promises.rename(
      path.resolve(uploadsConfig.TMP_FOLDER, filename),
      path.resolve(uploadsConfig.UPLOADS_FOLDER, filename)
    );

    return filename;
  }

  async deleteFile(filename) {
    const filePath = path.resolve(uploadsConfig.UPLOADS_FOLDER, filename);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
