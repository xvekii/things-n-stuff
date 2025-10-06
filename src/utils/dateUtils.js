import { format, formatISO, parseISO } from "date-fns";

export function getDueDate(rawInput) {
  if (!rawInput.trim()) return null;
  const parsedDateTime = parseISO(rawInput);
  return formatISO(parsedDateTime);
}

export function formatDateTime(isoString) {
  if (!isoString) return "";  
  const dateTime = parseISO(isoString);
  return format(dateTime, "MMM d, HH:mm");
}

export function formatForUser(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);  
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
