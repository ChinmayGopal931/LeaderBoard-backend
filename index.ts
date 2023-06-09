const express = require("express");
const app = express();
const port = 8000;
const fs = require("fs");

let data: any = {};

app.use(express.json());

// Enable CORS
app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.options("/api/postData", (req: any, res: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.send();
});

// Read data from the file on startup
fs.readFile("data.json", (err: any, fileData: any) => {
  if (err) {
    console.log("Error reading file:", err);
  } else {
    try {
      data = JSON.parse(fileData);
    } catch (err) {
      console.log("Error parsing file data:", err);
    }
  }
});

app.get("/api/data", (req: any, res: any) => {
  res.json(data);
});

app.post("/api/postData", (req: any, res: any) => {
  const newData = req.body;
  data.data.push(newData);

  res.json(data);
  fs.writeFileSync("data.json", JSON.stringify(data));
});

app.listen(port, () => {
  console.log(data);
  console.log(`Server listening at http://localhost:${port}`);
});
