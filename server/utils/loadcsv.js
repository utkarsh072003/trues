import fs from "fs";
import path from "path";
import csv from "csv-parser";

const CSV_PATH = path.join("/tmp", "sales.csv");

// 🔹 One-time download URL (can still be GitHub release)
const DOWNLOAD_URL =
  "https://github.com/utkarsh072003/trues/releases/download/v1.0/sales.csv";


const downloadCSVIfNeeded = async () => {
  if (fs.existsSync(CSV_PATH)) return;

  const response = await fetch(DOWNLOAD_URL);
  if (!response.ok) {
    throw new Error("Failed to download CSV");
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(CSV_PATH, buffer);
  console.log("CSV downloaded to local disk");
};

export const loadSalesData = async () => {
  await downloadCSVIfNeeded();

  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => {
        console.log(`CSV loaded: ${results.length} records`);
        resolve(results);
      })
      .on("error", reject);
  });
};
