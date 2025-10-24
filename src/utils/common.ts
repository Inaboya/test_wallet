export function startOfSeason(date: Date): Date {
const year = date.getUTCFullYear()
const month = date.getUTCMonth() + 1 // 1..12
// seasons start: Mar1, Jun1, Sep1, Dec1
if (month >= 3 && month < 6) return new Date(Date.UTC(year, 2, 1)) // Mar 1
if (month >= 6 && month < 9) return new Date(Date.UTC(year, 5, 1)) // Jun 1
if (month >= 9 && month < 12) return new Date(Date.UTC(year, 8, 1)) // Sep 1
// Dec..Feb -> winter start Dec 1 (may be previous year for Jan/Feb)
if (month >= 12) return new Date(Date.UTC(year, 11, 1))
return new Date(Date.UTC(year - 1, 11, 1))
}

export function dayOfSeasonUTC(date: Date): number {
const start = startOfSeason(date)
// compute difference in UTC days
const diff = Math.floor((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())) / (1000 * 60 * 60 * 24))
return diff + 1 // day 1-based
}

export function computePointsForDay(n: number): number {
if (n <= 1) return 2
if (n === 2) return 3
// use array to iterate
const pts: number[] = [0, 2, 3] // index by day
for (let i = 3; i <= n; i++) {
const val = Math.round(pts[i - 2] * 1 + pts[i - 1] * 0.6)
pts[i] = val
}
return pts[n]
}

export function humanFormatPoints(v: number): string {
if (v > 1000) return Math.round(v / 1000).toString() + 'K'
return String(v)
}


export function todaysPoints(): string {
const now = new Date()
const day = dayOfSeasonUTC(now)
const pts = computePointsForDay(day)
return humanFormatPoints(pts)
}

export function formattedDate(date: Date): string {
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  // If date is within the last 7 days, return weekday name
  if (date >= oneWeekAgo) {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  // Otherwise, return in dd/mm/yyyy format
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}:${month}:${year}, ${hours}:${minutes}`;
}
