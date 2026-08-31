import express from "express";
import diagnosesService from "./services/diagnosesService.ts";
import patientRouter from "./routes/patients.ts";

const app = express();
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
