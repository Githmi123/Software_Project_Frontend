import axios from "axios";
import Cookies from "js-cookie";
import React from "react";


async function refreshAccessToken()
{
    try{
        const response = await axios.get('http://localhost:3500/refresh/', {
            withCredentials: true 
        });

        if (response.status !== 200) {
            throw new Error('Failed to refresh access token');
        }

        // const data = await response.json();
        // console.log(data);
        const { accessToken } = response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        // Cookies.set("accessToken", accessToken);
        return accessToken;
    }
    catch (error){
        console.error('Failed to refresh token:', error);
        return null;
    }
}

export default refreshAccessToken;