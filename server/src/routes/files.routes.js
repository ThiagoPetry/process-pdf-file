const express = require("express");
const request = require("request-promise");

const router = express.Router();

const readPdf = async (file, cb) => {
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
  cb(response);
};

router.post("/read_pdf", async (req, res) => {
  try {
    const file = req.files;

    readPdf(file, (response) => {
      return res.status(200).json({ ...response });
    });
  } catch (error) {
    const statusCode = error?.statusCode || 500;
    const response = error?.error || error;

    return res.status(statusCode).json({ response });
  }
});

const updatePdf = async (file, text, cb) => {
  const options = {
    method: "POST",
    uri: "http://localhost:8081/update_pdf",
    json: true,
    formData: {
      file: {
        value: file.pdf.data,
        options: {
          filename: file.pdf.name,
          contentType: file.pdf.mimetype,
        },
      },
      text: text,
    },
  };

  await request(options).then((buffer) => {
    const test = Buffer.from(buffer);
    cb(test);
  }).catch((err) => {
    cb(err);
  });
};

router.post("/update_pdf", async (req, res) => {
  try {
    const file = req.files;
    const text = req.body.text;

    updatePdf(file, text, (response) => {
      return res.status(200).json({ response });
    });
  } catch (error) {
    const statusCode = error?.statusCode || 500;
    const response = error?.error || error;

    return res.status(statusCode).json({ response });
  }
});

module.exports = router;
