export default async function getFromTable(url: string) {
    const response = await fetch(import.meta.env.VITE_URL + url)

    const result = await response.json()

    if (result.error) {
        throw new Response('', {
            status: result.status,
            statusText: result.message
        })
    }

    return result.status
}