import csv from "csv-parser";
import https from "https";

const CSV_URL =
  "https://drive.google.com/uc?export=download&id=1UxF0YlkdQUUNmjkPoIBajbt3fXQvmo_l";

export const loadSalesData = () => {
  return new Promise((resolve, reject) => {
    const results = [];

    https
      .get(CSV_URL, (response) => {
        response
          .pipe(csv())
          .on("data", (data) => results.push(data))
          .on("end", () => resolve(results))
          .on("error", (err) => reject(err));
      })
      .on("error", (err) => reject(err));
  });
};
