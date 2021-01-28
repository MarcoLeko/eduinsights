export async function getMapStatisticsById(body) {
  const response = await fetch("api/v1/map-statistics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
}

export async function getDataStructureForQuery() {
  const response = await fetch("api/v1/query/categories/data-structure", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
}

export async function getStatisticForQuery(body) {
  const response = await fetch("api/v1/query/categories/statistic", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
}

export async function validateSelectedFilter(body) {
  const response = await fetch(
    "api/v1/query/categories/data-structure/validate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return handleResponse(response);
}

export async function getMapStatisticsList() {
  const response = await fetch("api/v1/map-statistics/list");

  return handleResponse(response);
}

function handleResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}
