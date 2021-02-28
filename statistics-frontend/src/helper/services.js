export async function getMapStatisticsById(id) {
  const response = await fetch(`api/v1/prepared-statistics/${id}`);

  return handleResponse(response);
}

export async function getMapStatisticsList() {
  const response = await fetch("api/v1/prepared-statistics/list");

  return handleResponse(response);
}

export async function getDataStructureForQuery(body) {
  const response = await fetch("api/v1/query/categories/data-structure", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
}

export async function getStatisticWithQuery(body) {
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

function handleResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}
