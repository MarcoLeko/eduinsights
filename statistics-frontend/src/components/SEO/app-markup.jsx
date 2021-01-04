import React from "react";
import { Helmet } from "react-helmet";

export function AppMarkup() {
  const markup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Eduinsights",
    operatingSystem: ["ANDROID", "OSX", "WINDOWS"],
    applicationCategory: "StatisticsApplication",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(markup)}</script>
    </Helmet>
  );
}
