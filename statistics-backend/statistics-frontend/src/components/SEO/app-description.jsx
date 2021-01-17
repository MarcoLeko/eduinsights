import React from "react";
import { Helmet } from "react-helmet";

export function AppDescription({ description }) {
  return (
    <Helmet>
      <meta
        name="description"
        content={description.substring(0, 317).concat("...")}
      />
    </Helmet>
  );
}
