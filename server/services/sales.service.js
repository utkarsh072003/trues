import { loadSalesData } from "../utils/loadcsv.js";

let cachedData = null;

const applySearch = (data, search) => {
  if (!search) return data;

  const term = search.toLowerCase();

  return data.filter(
    (item) =>
      item["Customer Name"]?.toLowerCase().includes(term) ||
      item["Phone Number"]?.toString().includes(term)
  );
};

const applyFilters = (data, options) => {
  return data.filter((item) => {
    if (options.region.length && !options.region.includes(item["Customer Region"])) {
      return false;
    }

    if (options.gender.length && !options.gender.includes(item["Gender"])) {
      return false;
    }

    if (options.category.length && !options.category.includes(item["Product Category"])) {
      return false;
    }

    if (options.payment.length && !options.payment.includes(item["Payment Method"])) {
      return false;
    }

    if (options.tags.length) {
     const itemTags = item["Tags"]?.split(",").map(t => t.trim()) || [];

      const hasTag = options.tags.some((tag) => itemTags.includes(tag));
      if (!hasTag) return false;
    }

    const age = Number(item["Age"]);
    if (options.ageRange.min !== null && age < options.ageRange.min) return false;
    if (options.ageRange.max !== null && age > options.ageRange.max) return false;

    const date = new Date(item["Date"]);
    if (options.dateRange.start && date < new Date(options.dateRange.start)) return false;
    if (options.dateRange.end && date > new Date(options.dateRange.end)) return false;

    return true;
  });
};

const applySorting = (data, sortBy, order) => {
  const sorted = [...data];

  sorted.sort((a, b) => {
    let valA;
    let valB;

    if (sortBy === "date") {
      valA = new Date(a["Date"]);
      valB = new Date(b["Date"]);
    } else if (sortBy === "quantity") {
      valA = Number(a["Quantity"]);
      valB = Number(b["Quantity"]);
    } else if (sortBy === "customerName") {
      valA = a["Customer Name"]?.toLowerCase() || "";
      valB = b["Customer Name"]?.toLowerCase() || "";
    } else {
      return 0;
    }

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });

  return sorted;
};

const applyPagination = (data, page, pageSize) => {
  const start = (page - 1) * pageSize;
  return data.slice(start, start + pageSize);
};

export const getFilteredSales = async (options) => {
  if (!cachedData || cachedData.length === 0) {
    cachedData = await loadSalesData();
  }

  let processed = applySearch(cachedData, options.search);
  processed = applyFilters(processed, options);
  processed = applySorting(processed, options.sortBy, options.order);

  const totalRecords = processed.length;
  const totalPages = Math.ceil(totalRecords / options.pageSize);

  const safePage =
    totalPages === 0
      ? 1
      : options.page < 1
      ? 1
      : options.page > totalPages
      ? totalPages
      : options.page;

  return {
    data: applyPagination(processed, safePage, options.pageSize),
    page: safePage,
    pageSize: options.pageSize,
    totalRecords,
    totalPages
  };
};


