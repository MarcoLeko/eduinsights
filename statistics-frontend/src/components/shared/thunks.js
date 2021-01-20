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

export async function getUISCategories() {
  const response = await fetch("api/v1/query", {
    headers: {
      "Content-Type": "application/json",
    },
  });

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
