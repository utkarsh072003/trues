export const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (isNaN(date)) return "-";
  return date.toLocaleDateString();
};

export const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "-";
  return `₹${Number(value).toFixed(2)}`;
};

export const formatText = (value) => {
  if (!value) return "-";
  return String(value);
};
