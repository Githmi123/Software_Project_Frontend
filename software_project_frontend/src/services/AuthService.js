import Cookies from "js-cookie";


async function refreshAccessToken()
{
    try{
        const response = await fetch('http://localhost:3500/refresh/', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to refresh access token');
        }

        const data = await response.json();
        console.log(data);
        const { accessToken } = data;
        Cookies.set("accessToken", accessToken);
        return accessToken;
    }
    catch (error){
        console.error('Failed to refresh token:', error);
        throw error;
    }
}

export default refreshAccessToken;