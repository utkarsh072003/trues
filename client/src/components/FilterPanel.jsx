import { useState } from "react";

function FilterPanel({ onFilterChange }) {
  const [localFilters, setLocalFilters] = useState({
    region: "",
    gender: "",
    category: "",
    payment: "",
    tags: "",
    ageMin: "",
    ageMax: "",
    startDate: "",
    endDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    onFilterChange({
      region: localFilters.region
        ? localFilters.region.split(",").map((v) => v.trim())
        : [],
      gender: localFilters.gender
        ? localFilters.gender.split(",").map((v) => v.trim())
        : [],
      category: localFilters.category
        ? localFilters.category.split(",").map((v) => v.trim())
        : [],
      payment: localFilters.payment
        ? localFilters.payment.split(",").map((v) => v.trim())
        : [],
      tags: localFilters.tags
        ? localFilters.tags.split(",").map((v) => v.trim())
        : [],
      ageMin: localFilters.ageMin ? Number(localFilters.ageMin) : null,
      ageMax: localFilters.ageMax ? Number(localFilters.ageMax) : null,
      startDate: localFilters.startDate || null,
      endDate: localFilters.endDate || null
    });
  };

  return (
    <div className="filter-panel">
      <input name="region" placeholder="Region" value={localFilters.region} onChange={handleChange} />
      <input name="gender" placeholder="Gender" value={localFilters.gender} onChange={handleChange} />
      <input name="category" placeholder="Category" value={localFilters.category} onChange={handleChange} />
      <input name="payment" placeholder="Payment" value={localFilters.payment} onChange={handleChange} />
      <input name="tags" placeholder="Tags" value={localFilters.tags} onChange={handleChange} />
      <input type="number" name="ageMin" placeholder="Min Age" value={localFilters.ageMin} onChange={handleChange} />
      <input type="number" name="ageMax" placeholder="Max Age" value={localFilters.ageMax} onChange={handleChange} />
      <input type="date" name="startDate" value={localFilters.startDate} onChange={handleChange} />
      <input type="date" name="endDate" value={localFilters.endDate} onChange={handleChange} />

      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
}

export default FilterPanel;
