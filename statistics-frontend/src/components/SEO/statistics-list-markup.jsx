import React from "react";
import { Helmet } from "react-helmet";

export function StatisticsListMarkup({ statisticsList }) {
  const { location } = window;

  const markup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: statisticsList.length,
    itemListElement: statisticsList.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: location.origin + "?statistics=" + item.key,
      description: item.description,
      name: item.key,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(markup)}</script>
    </Helmet>
  );
}
