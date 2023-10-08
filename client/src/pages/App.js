import React, { useState } from "react";

import { HiOutlineDownload } from "react-icons/hi";

import { bePost } from "../api/api";
import { fileSize } from "../utils/fileSize";
import { downloadFile } from "../utils/downloadFile";

import FileButton from "../components/FileButton";

const App = () => {
  const [file, setFile] = useState({});
  const [pdfText, setPdfText] = useState("");
  const [pdfSize, setPdfSize] = useState("");

  const sendPdf = async (file) => {
    const formData = new FormData();

    if (file) {
      formData.append("pdf", file, "file.pdf");
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const { data } = await bePost("/api/files/read_pdf", formData, config);

    if (data?.success) {
      setPdfText(data.text);
    }

    setPdfSize(fileSize(file.size));
  };

  const onChangeFile = (value) => {
    setFile(value);
  };

  const onChangePdfText = (e) => {
    setPdfText(e.target.value);
  };

  return (
    <div id={"insert-pdf"}>
      {!file.name &&
        <FileButton
          sendPdf={sendPdf}
          onChangeFile={onChangeFile}
        />
      }

      <div className={"pdf"}>
        {file.name &&
          <div className={"info"}>
            <p><b>File:</b> {file.name}</p>
            <p><b>Size:</b> {pdfSize}</p>
            <button onClick={downloadFile}><HiOutlineDownload /></button>
          </div>
        }

        <div className={"view"}>
          {file.url &&
            <iframe
              title={"pdf"}
              src={file.url}
              id={"iframe-pdf"}
              className={"size-fix"}
            />
          }

          {file.url &&
            <textarea
              id={"text-pdf"}
              value={pdfText}
              className={"size-fix"}
              onChange={onChangePdfText}
            />
          }
        </div>

      </div>
    </div>
  );
};

export default App;
