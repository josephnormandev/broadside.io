export default async function get(url)
{
    return await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    });
}
