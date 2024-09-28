import { redirect } from "react-router-dom"

export async function putToTable(data: any, url: string) {
    const token = JSON.parse(localStorage.getItem('token') as string)

    const response = await fetch(import.meta.env.VITE_URL + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
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

export async function putToTableWithFormData(data: FormData, url: string) {
    const token = JSON.parse(localStorage.getItem('token') as string)

    const response = await fetch(import.meta.env.VITE_URL + url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: data
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