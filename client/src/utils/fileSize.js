const fileSize = (size) => {
  const round = +size / 1024;

  if (size.toString().length < 7) {
    return `${Math.round(round).toFixed(2)}kb`;
  } else {
    return `${(Math.round(round) / 1000).toFixed(2)}MB`;
  }
};

export { fileSize };
