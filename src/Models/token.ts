export async function isTokenValid() {
    const tokenValue = localStorage.getItem('token')

    const token = (tokenValue != 'undefined') ?
        JSON.parse(localStorage.getItem('token') as string ?? '[]') :
        JSON.parse('[]')

    if (JSON.stringify(token) == '[]') {
        return { value: false }
    }

    console.log(token)

    const response = await fetch(`${import.meta.env.VITE_URL}/token/manager`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const result = await response.json()

    return result
}