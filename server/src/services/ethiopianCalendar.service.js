export function toEthiopianDate(date) {
  if (!date) return null;

  const gregorianDate = new Date(date);
  if (Number.isNaN(gregorianDate.getTime())) return null;

  return {
    year: gregorianDate.getUTCFullYear() - 8,
    month: gregorianDate.getUTCMonth() + 1,
    day: gregorianDate.getUTCDate(),
    approximate: true,
  };
}
