export function getColor(key) {
  switch (key) {
    case "firstRange":
      return "#228B22";
    case "secondRange":
      return "#9ACD32";
    case "thirdRange":
      return "#FFEDA0";
    case "fourthRange":
      return "#FF6347";
    case "fifthRange":
    default:
      return "#800026";
  }
}
