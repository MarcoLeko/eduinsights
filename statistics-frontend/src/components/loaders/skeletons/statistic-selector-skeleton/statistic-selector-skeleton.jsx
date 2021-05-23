import React from "react";
import { Skeleton } from "@material-ui/lab";
import "./statistic-selector-skeleton.scss";

export function StatisticSelectorSkeleton() {
  return (
    <div className="skeleton-container">
      <Skeleton variant="rect" className="skeleton-rect" />
      <div className="skeleton-dots-flex mt-2">
        {Array.from(new Array(8).fill(1)).map((v, i) => (
          <Skeleton key={v + i} variant="circle" className="skeleton-dot" />
        ))}
      </div>
    </div>
  );
}
