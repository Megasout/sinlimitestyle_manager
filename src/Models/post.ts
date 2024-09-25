import { redirect } from "react-router-dom"

export async function postToTable(data: any, url: string) {
    const token = JSON.parse(localStorage.getItem('token') as string)

    const response = await fetch(import.meta.env.VITE_URL + url, {
        method: 'POST',
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

export async function postToTableWithFormData(data: FormData, url: string) {
    const token = JSON.parse(localStorage.getItem('token') as string)

    const response = await fetch(import.meta.env.VITE_URL + url, {
        method: 'POST',
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

export async function postLogin(data: any) {
    const response = await fetch(`${import.meta.env.VITE_URL}/login/manager`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}