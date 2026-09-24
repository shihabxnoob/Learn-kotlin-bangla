/** Bengali numeral formatting */
const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Two-digit Bengali number with single leading zero, e.g. 1 → ০১, 8 → ০৮ */
export const bnDigits = (n: number) =>
  String(n)
    .padStart(2, "0")
    .replace(/\d/g, (d) => digits[Number(d)]);

/** Raw Bengali numeral without leading zero, e.g. 1 → ১, 8 → ৮ */
export const bnNumber = (n: number) =>
  String(n).replace(/\d/g, (d) => digits[Number(d)]);

