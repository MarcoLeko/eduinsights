import React from "react";
import { Skeleton } from "@material-ui/lab";
import "./filter-selector-skeleton.scss";

export function FilterSelectorSkeleton() {
  return Array.from(Array(21).keys()).map((i) => (
    <Skeleton className="filter-select skeleton-input" variant="rect" key={i} />
  ));
}
