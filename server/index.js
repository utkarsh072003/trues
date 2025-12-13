import express from "express";
import cors from "cors";
import salesRoutes from "./routes/sales.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sales", salesRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "TruEstate Retail Sales Backend is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
