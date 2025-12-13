import csv from "csv-parser";
import https from "https";

const CSV_URL =
  "https://drive.google.com/uc?export=download&id=1UxF0YlkdQUUNmjkPoIBajbt3fXQvmo_l";

export const loadSalesData = () => {
  return new Promise((resolve, reject) => {
    const results = [];

    https.get(CSV_URL, (response) => {
  console.log("Content-Type:", response.headers["content-type"]);

};
