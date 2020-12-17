export function getColor(d) {
  return d > 90
    ? "#228B22"
    : d > 80
    ? "#9ACD32"
    : d > 70
    ? "#FFEDA0"
    : d > 50
    ? "#FD8D3C"
    : d > 25
    ? "#FF6347"
    : "#800026";
}
