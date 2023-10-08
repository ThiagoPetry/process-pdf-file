const downloadFile = (file) => {
  const element = document.createElement("a");
  element.href = file.url;
  element.setAttribute("download", file.name);
  element.click();
};

export { downloadFile };
