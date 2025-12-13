import { useEffect, useState } from "react";
import { fetchSales } from "../services/salesApi";

const DEFAULT_PAGE_SIZE = 10;

export const useSalesData = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    region: [],
    gender: [],
    category: [],
    tags: [],
    payment: [],
    ageMin: null,
    ageMax: null,
    startDate: null,
    endDate: null
  });

  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchSales({
          search,
          ...filters,
          sortBy,
          order,
          page,
          pageSize: DEFAULT_PAGE_SIZE
        });

        setData(response.data);
        setPage(response.page);
        setTotalPages(response.totalPages);
        setTotalRecords(response.totalRecords);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [search, filters, sortBy, order, page]);

  const updateSearch = (value) => {
    setPage(1);
    setSearch(value);
  };

  const updateFilters = (newFilters) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const updateSorting = (newSortBy, newOrder) => {
    setPage(1);
    setSortBy(newSortBy);
    setOrder(newOrder);
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage((p) => p + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  };

  return {
    data,
    loading,
    error,
    page,
    totalPages,
    totalRecords,
    search,
    filters,
    sortBy,
    order,
    updateSearch,
    updateFilters,
    updateSorting,
    nextPage,
    prevPage
  };
};
