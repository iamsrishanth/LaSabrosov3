/**
 * Café hours helpers — computes open/closed status from IST (Asia/Kolkata).
 * Hours: 11:00 AM – 11:00 PM, all seven days.
 */

export interface OpenStatus {
  open: boolean;
  label: string;
  detail: string;
}

/** Whether the café is currently open, computed in IST regardless of viewer tz. */
export function getOpenStatus(now: Date = new Date()): OpenStatus {
  // Convert "now" to IST (UTC+5:30) without relying on Intl tz data for arithmetic.
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const ist = new Date(utcMs + 5.5 * 3_600_000);
  const hours = ist.getHours();
  const minutes = ist.getMinutes();
  const totalMin = hours * 60 + minutes;
  const openMin = 11 * 60; // 11:00 AM
  const closeMin = 23 * 60; // 11:00 PM

  if (totalMin >= openMin && totalMin < closeMin) {
    const remaining = closeMin - totalMin;
    const h = Math.floor(remaining / 60);
    const m = remaining % 60;
    return {
      open: true,
      label: "Open now",
      detail:
        h > 0 ? `Closes in ${h}h ${m}m` : `Closes in ${m}m`,
    };
  }
  // closed — next opening is today 11 AM (or already past midnight)
  return {
    open: false,
    label: "Closed now",
    detail: "Opens 11:00 AM",
  };
}

/** Format IST "now" for display (e.g. "3:42 PM IST"). */
export function istNow(now: Date = new Date()): string {
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const ist = new Date(utcMs + 5.5 * 3_600_000);
  let h = ist.getHours();
  const m = ist.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")} ${ampm} IST`;
}
