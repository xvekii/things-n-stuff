import { format, formatISO, parseISO } from "date-fns";

export function getDueDate(rawInput) {
  if (!rawInput.trim()) return null;
  const parsedDateTime = parseISO(rawInput);
  return formatISO(parsedDateTime);
}

export function formatForUser(isoString) {
  if (!isoString) return "";
  
  let date;

  if (isoString instanceof Date) {
    date = isoString;
  } else if (typeof isoString === "string") {
    date = parseISO(isoString);
    if (isNaN(date.getTime())) {
      date = new Date(isoString);  
    }
  } else if (typeof isoString === "number") {
    date = new Date(isoString);
  }

  if (!date || isNaN(date.getTime())) return "";
  
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function toDatetimeLocalString(date = new Date()) {
  return format(date, "yyyy-MM-dd'T'HH:mm");
}