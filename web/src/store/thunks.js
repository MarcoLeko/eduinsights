export async function getInternetAccessStatistics() {
    try {
        const response = await fetch('https://localhost:8080/statistics/internet-access');
        return response.json();
    } catch (e) {
        return {type: 'featureCollection', features: []};
        // throw new Error('Could not fetch Internet-statistics: ' + e);
    }
}
