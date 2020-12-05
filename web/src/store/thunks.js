export async function getInternetAccessStatistics() {
  const response = await fetch("api/v1/statistics/internet-access");
  return handleResponse(response);
}

function handleResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}
