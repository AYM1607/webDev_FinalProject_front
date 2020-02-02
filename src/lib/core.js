const numberFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "MXN"
});

export function mapColorStringToHexString(color) {
  switch (color) {
    case "black":
      return "#19180A";
    case "mocka":
      return "#3F220F";
    case "tan":
      return "#804000";
    default:
      return "black";
  }
}

export function formatNumber(number) {
  return numberFormatter.format(number);
}
