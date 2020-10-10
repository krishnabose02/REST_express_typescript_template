import express from "express";
import cors from "cors";
import { BaseRoutes } from "./api/routes";

const app = express();

app.use(express.json({ limit: "50mb" }));
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use('/api', new BaseRoutes().getRouter());

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log("running on port 4000");
});
