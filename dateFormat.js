const dateFormatsArr = [
  { format: "dd.MM.yyyy", delimeter: "." },
  { format: "yyyy.MM.dd", delimeter: "." },
  { format: "yyyy-MM-dd", delimeter: "-" },
  { format: "yyyy-dd-MM", delimeter: "-" },
  { format: "MM/dd/yyyy", delimeter: "/" },
  { format: "yyyy/MM/dd", delimeter: "/" },
];
export const parseDate = (dateString) => {
  if (dateString == null) return new Date();
  let parsedDate = new Date(dateString);

  if (isNaN(parsedDate)) {
    for (const { format, delimeter } of dateFormatsArr) {
      const parts = dateString.split(delimeter);
      if (parts.length === 3) {
        const yearIndex = format.indexOf("yyyy");
        const monthIndex = format.indexOf("MM");
        const dayIndex = format.indexOf("dd");
        const year = parseInt(parts[yearIndex], 10);
        const month = parseInt(parts[monthIndex], 10);
        const day = parseInt(parts[dayIndex], 10);
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          return new Date(year, month - 1, day);
        }
      }
    }
  }

  return parsedDate;
};