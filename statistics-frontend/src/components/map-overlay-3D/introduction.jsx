import React from "react";
import Box from "@material-ui/core/Box";

function Introduction() {
  return (
    <Box component={"section"} p={1}>
      <p>
        {
          "Education is a human right for all throughout life and that access must be matched by quality."
        }
      </p>
      <p>
        {
          "Education is widely accepted to be a fundamental resource, both for individuals and societies."
        }
      </p>
      <p>
        {
          "However there still huge inequalities between nations, which can be differentiated by one of the selected statistical unit:"
        }
      </p>
    </Box>
  );
}

export default Introduction;
