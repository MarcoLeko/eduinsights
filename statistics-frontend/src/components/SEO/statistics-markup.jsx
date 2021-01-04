import React from "react";
import { Helmet } from "react-helmet";
import { name as appName } from "../../../package.json";

export function StatisticsMarkup({ data }) {
  const { location } = window;

  const markup = {
    "@context": "http://schema.org",
    "@type": "Dataset",
    name: "Educational statistics",
    description: "Global visualization for educational statistics/observations provided by UNESCO: ".concat(
      data.statisticsList.map((item) => item.description)
    ),
    keywords: data.statisticsList.map(
      (item) => "Statistics > education > " + item.description
    ),
    creator: {
      "@type": "Organization",
      url: location.origin,
      name: appName,
      contactPoint: {
        "@type": "ContactPoint",
        email: "Leko.marco@outlook.com",
      },
    },
    url: location.href,
    temporalCoverage: `${new Date(data.startYear)}/${new Date(data.endYear)}`,
    spatialCoverage: {
      "@type": "Place",
      geo: {
        "@type": "GeoShape",
        box: "-90 -175 80 175",
      },
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(markup)}</script>
    </Helmet>
  );
}
