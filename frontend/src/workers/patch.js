export default async function delete(url, data)
{
    return await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    });
}
