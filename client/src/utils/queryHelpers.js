export const cleanParams = (params) => {
  const cleaned = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (Array.isArray(value) && value.length === 0) return;
    cleaned[key] = value;
  });

  return cleaned;
};
