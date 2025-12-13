function SearchBar({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by customer name or phone"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
