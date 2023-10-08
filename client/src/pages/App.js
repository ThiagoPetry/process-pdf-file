import React, { useState } from "react";

import { HiOutlineDownload } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

import { bePost } from "../api/api";
import { fileSize } from "../utils/fileSize";
import { downloadFile } from "../utils/downloadFile";

import Loading from "../components/Loading";
import FileButton from "../components/FileButton";

const App = () => {
  const [file, setFile] = useState({});
  const [error, setError] = useState("");
  const [pdfText, setPdfText] = useState("");
  const [pdfSize, setPdfSize] = useState("");
  const [loading, setLoading] = useState(false);
  
  const sendPdf = async (file) => {
    const formData = new FormData();

    setLoading(true);

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

    setLoading(false);

    if (data?.success) {
      setPdfText(data.text);
      setPdfSize(fileSize(file.size));
    } else {
      setError("Não foi possível processar o PDF.");
    }
  };

  const reset = () => {
    setFile({});
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

      {loading &&
        <Loading />
      }

      {error &&
        <p>{error}</p>
      }

      <div className={"pdf"}>
        {file.name &&
          <div className={"info"}>
            <p><b>File:</b> {file.name}</p>
            <p><b>Size:</b> {pdfSize}</p>
            <button onClick={downloadFile}><HiOutlineDownload /></button>
            <button onClick={reset}><AiOutlineDelete /></button>
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
