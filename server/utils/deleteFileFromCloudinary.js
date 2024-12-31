const v2 = require("cloudinary");
const v4 = require("uuid");

const deleteFileToCloudinary = async (files = []) => {
  const upload = files.map((file) => {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          resource_type: "auto",
          public_id: v4(),
        },
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(upload);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));

    return formattedResults;
  } catch (error) {
    throw new Error("Error in uploading files", error);
  }
};

module.exports = { deleteFileToCloudinary };
