import fs from "fs";
import path from "path";
import csv from "csv-parser";

const CSV_PATH = path.join("/tmp", "sales.csv");

const DOWNLOAD_URL =
  "https://github.com/<USERNAME>/<REPO>/releases/download/v1.0/sales.csv";

const downloadCSVIfNeeded = async () => {
  console.log("➡️ Checking CSV at", CSV_PATH);

  if (fs.existsSync(CSV_PATH)) {
    console.log("✅ CSV already exists locally");
    return;
  }

  console.log("⬇️ Downloading CSV...");

  const response = await fetch(DOWNLOAD_URL); // ✅ global fetch (Node 22)

  if (!response.ok) {
    throw new Error(`Failed to download CSV: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(CSV_PATH, buffer);

  console.log("✅ CSV downloaded to local disk");
};

export const loadSalesData = async () => {
  console.log("➡️ loadSalesData called");

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
