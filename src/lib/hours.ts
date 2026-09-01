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

/**
 * Happy hour — 4:00 PM to 7:00 PM IST daily (complimentary dessert on couples night Thu).
 * Computes the countdown to the next happy-hour boundary.
 */
export const HAPPY_HOUR_START = 16; // 4 PM
export const HAPPY_HOUR_END = 19; // 7 PM

export interface HappyHourStatus {
  active: boolean;
  label: string;
  /** seconds remaining to the next boundary (start or end) */
  secondsLeft: number;
  /** target label, e.g. "Happy hour ends in" or "Happy hour starts in" */
  target: string;
}

export function getHappyHourStatus(now: Date = new Date()): HappyHourStatus {
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const ist = new Date(utcMs + 5.5 * 3_600_000);
  const totalSec = ist.getHours() * 3600 + ist.getMinutes() * 60 + ist.getSeconds();
  const startSec = HAPPY_HOUR_START * 3600;
  const endSec = HAPPY_HOUR_END * 3600;

  if (totalSec >= startSec && totalSec < endSec) {
    return {
      active: true,
      label: "Happy hour live",
      secondsLeft: endSec - totalSec,
      target: "ends in",
    };
  }
  // not active — count down to next start
  const nextStart =
    totalSec < startSec
      ? startSec - totalSec
      : 24 * 3600 - totalSec + startSec;
  return {
    active: false,
    label: "Happy hour soon",
    secondsLeft: nextStart,
    target: "starts in",
  };
}

/** Format seconds as H:MM:SS or MM:SS. */
export function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
