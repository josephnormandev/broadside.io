export default async function options(url, data)
{
    return await fetch(url, {
        method: 'OPTIONS',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    });
}
