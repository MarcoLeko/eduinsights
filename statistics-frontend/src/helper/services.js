export async function getMapStatisticsById(id) {
  const response = await fetch(`api/v1/prepared-statistics/${id}`);

  return handleResponse(response);
}

export async function getMapStatisticsList() {
  const response = await fetch("api/v1/prepared-statistics/list");

  return handleResponse(response);
}

export async function getFilter(body) {
  const response = await fetch("api/v1/filter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
}

export async function validateClientFilter(body) {
  const response = await fetch("api/v1/filter/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
}

export async function getStatisticWithQuery(body) {
  const response = await fetch("api/v1/dynamic-statistics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
}

function handleResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}
