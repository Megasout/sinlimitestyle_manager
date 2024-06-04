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