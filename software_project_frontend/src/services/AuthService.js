import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
const baseUrl = process.env.REACT_APP_BASE_URL;

async function refreshAccessToken() {
  try {
    const response = await axios.get(`${baseUrl}/refresh/`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error("Failed to refresh access token");
    }

    const { accessToken } = response.data;
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
}

export default refreshAccessToken;
