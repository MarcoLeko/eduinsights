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

function inRange(x, min, max) {
  return (x - min) * (x - max) <= 0;
}

export function getColorRange(evaluation, feature) {
  return evaluation.find((obj) =>
    inRange(feature.properties.value, obj.value[1], obj.value[0])
  );
}
