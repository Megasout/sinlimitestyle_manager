import { redirect } from "react-router-dom"

export default async function deleteFromTable(url: string) {
    const token = JSON.parse(localStorage.getItem('token') as string)

    const response = await fetch(import.meta.env.VITE_URL + url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const result = await response.json()

    if (!result.token) {
        redirect('/')
    }

    if (result.error) {
        throw new Response('', {
            status: result.status,
            statusText: result.message
        })
    }

    return result
}