import React, { memo } from "react";
import { Paper, Typography } from "@material-ui/core";
import "./map-tooltip.scss";

function ToolTip({ selectedCountry, tooltipPos }) {
  return (
    Boolean(selectedCountry && tooltipPos.pageX) && (
      <Paper
        className="tooltip"
        style={{
          left: tooltipPos.pageX + 20,
          top: tooltipPos.pageY + 20,
        }}
      >
        <Typography component="p" color="textSecondary">
          {"Country: " + selectedCountry.properties.name}
        </Typography>
        <Typography component="p" color="textSecondary" variant="h5">
          {selectedCountry.properties.value === null
            ? "No values found"
            : "Value: " +
              selectedCountry.properties.value +
              (selectedCountry.evaluationType === "percentage" ? "%" : "")}
        </Typography>
      </Paper>
    )
  );
}

export const MapToolTip = memo(ToolTip);
