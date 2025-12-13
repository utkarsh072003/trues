import { getFilteredSales } from "../services/sales.service.js";

export const getSales = async (req, res) => {
  try {
    const {
      search,
      region,
      gender,
      category,
      tags,
      payment,
      ageMin,
      ageMax,
      startDate,
      endDate,
      sortBy,
      order,
      page
    } = req.query;

    const options = {
      search: search?.trim() || "",
      region: region ? region.split(",") : [],
      gender: gender ? gender.split(",") : [],
      category: category ? category.split(",") : [],
      tags: tags ? tags.split(",") : [],
      payment: payment ? payment.split(",") : [],
      ageRange: {
        min: ageMin ? Number(ageMin) : null,
        max: ageMax ? Number(ageMax) : null
      },
      dateRange: {
        start: startDate || null,
        end: endDate || null
      },
      sortBy: sortBy || "date",
      order: order || "desc",
      page: page ? Number(page) : 1,
      pageSize: 10
    };

    const result = await getFilteredSales(options);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sales data"
    });
  }
};
