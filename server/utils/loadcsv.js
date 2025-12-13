import csv from "csv-parser";
import { https } from "follow-redirects";

const CSV_URL =
  "https://github.com/utkarsh072003/trues/releases/download/v1.0/sales.csv";

export const loadSalesData = () => {
  return new Promise((resolve, reject) => {
    const results = [];

    https
      .get(CSV_URL, (response) => {
        console.log("Final Content-Type:", response.headers["content-type"]);

        response
          .pipe(csv())
          .on("data", (row) => results.push(row))
          .on("end", () => {
            console.log(`CSV loaded: ${results.length} records`);
            resolve(results);
          })
          .on("error", reject);
      })
      .on("error", reject);
  });
};
