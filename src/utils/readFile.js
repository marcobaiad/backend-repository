import fs from "fs";
export const readFile = (
  callback,
  returnJson = true,
  filePath,
  encoding = "utf8"
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) throw err;
    callback(returnJson && data ? JSON.parse(data) : data);
  });
};
