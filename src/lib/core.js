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

export function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
