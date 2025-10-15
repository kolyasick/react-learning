export const formatCurrency = (amount: number, currency: "USD" | "RUB" = "USD") => {
  if (!amount) return "0 $";
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};
