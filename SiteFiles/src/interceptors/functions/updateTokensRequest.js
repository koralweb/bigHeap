async function updateTokensRequest() {
    try {
        const response = await fetch('http://localhost:9990/api/updateTokensRequest')
        const data = await response.json()
        return data
    }catch (e) {
        return {error: 'error some'}
    }

}

export default updateTokensRequest
