 const BASE_URL = "http://localhost:5000/api/sales";


export const fetchSales = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (Array.isArray(value) && value.length === 0) return;

    if (Array.isArray(value)) {
      query.append(key, value.join(","));
    } else {
      query.append(key, value);
    }
  });

  const response = await fetch(`${BASE_URL}?${query.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch sales data");
  }

  return response.json();
};
