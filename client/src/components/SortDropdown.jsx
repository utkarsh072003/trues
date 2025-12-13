function SortDropdown({ sortBy, order, onSortChange }) {
  const handleChange = (e) => {
    const value = e.target.value;

    if (value === "date") {
      onSortChange("date", "desc");
    } else if (value === "quantity") {
      onSortChange("quantity", "asc");
    } else if (value === "customerName") {
      onSortChange("customerName", "asc");
    }
  };

  return (
    <div>
      <select value={sortBy} onChange={handleChange}>
        <option value="date">Date (Newest First)</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer Name (A–Z)</option>
      </select>
    </div>
  );
}

export default SortDropdown;
