import React from "react";
import { Helmet } from "react-helmet";

export function AppDescription({ description }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
    </Helmet>
  );
}
