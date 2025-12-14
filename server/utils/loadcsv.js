import fs from "fs";
import path from "path";
import csv from "csv-parser";
import followRedirects from "follow-redirects";

const { https } = followRedirects;

const CSV_PATH = path.join("/tmp", "sales.csv");

const DOWNLOAD_URL =
  "https://huggingface.co/datasets/utkarsh072003/truestate-sales-data/resolve/main/sales_data.csv";

const downloadCSVIfNeeded = () => {
  return new Promise((resolve, reject) => {
    

    console.log("⬇️ Downloading CSV from Hugging Face...");

    const file = fs.createWriteStream(CSV_PATH);

    https.get(DOWNLOAD_URL, (response) => {
      const ct = response.headers["content-type"];
      console.log("📄 Content-Type:", ct);

      if (!ct || !ct.includes("csv")) {
        return reject(new Error(`Invalid content-type: ${ct}`));
      }

      response.pipe(file);

      file.on("finish", () => {
        file.close();
        console.log("✅ CSV downloaded to local disk");
        resolve();
      });
    }).on("error", reject);
  });
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
