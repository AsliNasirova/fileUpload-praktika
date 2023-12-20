import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
const app = express();

const port = 3000;
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extented: true }));
app.use(express.static("server/public"));

const __dirname = path.resolve();

app.get("/", (req, res) => {
  res.send("");
});

app.post("/upload", async (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  sampleFile = req.files.sampleFile;
  // uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;
  console.log(__dirname);
  uploadPath = path.join(__dirname, "public", sampleFile.name);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});

app.listen(port, () => {
  console.log(`Example ${port}`);
});
