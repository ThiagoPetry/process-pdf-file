const express = require("express");
const request = require("request-promise");

const router = express.Router();

router.post("/read_pdf", async (req, res) => {
  try {
    const file = req.files;

    const options = {
      method: "POST",
      uri: "http://localhost:8081/read_pdf",
      json: true,
      formData: {
        file: {
          value: file.pdf.data,
          options: {
            filename: file.pdf.name,
            contentType: file.pdf.mimetype,
          },
        },
      },
    };

    const response = await request(options);

    return res.status(200).json({ ...response });
  } catch (error) {
    let statusCode = 500;

    if (error?.statusCode) {
      statusCode = error.statusCode;
    }

    if (error?.error) {
      error = error.error;
    }

    const response = error;
    response.error = true;

    return res.status(statusCode).json({ response });
  }
});

module.exports = router;
