import React, { useCallback, useRef } from "react";

const FileButton = ({
  sendPdf,
  onChangeFile,
}) => {
  const pdf = useRef();

  const onChangePdf = useCallback(() => {
    const file = pdf.current?.files;
    sendPdf(file[0]);

    const fileToBlob = new Blob(file, { type: "application/pdf" });
    const blobToUrl = URL.createObjectURL(fileToBlob);

    file[0].url = blobToUrl + "#toolbar=0";
    onChangeFile(file[0]);

    // eslint-disable-next-line
  }, []);

  return (
    <div id={"file-button"}>
      <label htmlFor={"pdf"}>Select file</label>
      <input
        ref={pdf}
        id={"pdf"}
        type={"file"}
        accept={".pdf"}
        onChange={onChangePdf}
      />
    </div>
  );
}

export default FileButton;
