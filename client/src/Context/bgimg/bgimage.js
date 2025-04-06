// const apikey = process.env.BG_KEY;

async function Bg() {
    const query="space"
    console.log(query)
    const url = `https://api.unsplash.com/search/collections?random&query=${query}&client_id=lPM9InLHCdWDgUCydlu9oIj6q6EP8P0TlM0n540yosU`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.results[0].preview_photos[0].urls.regular +"&h=1000"; // Return the URL
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null; // Return null in case of an error
    }
}

export default async function bgurl() {
    const bgi = await Bg(); // Wait for the async function to resolve
    return bgi; // Return the fetched URL for use in other components
}
