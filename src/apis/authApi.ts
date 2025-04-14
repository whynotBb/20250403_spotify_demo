import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig";
import { ClientCredentialTokenResponse, ExchangeTokenResponse } from "../models/auth";
import { REDIRECT_URI } from "../configs/commonConfig";

const encodedBase64 = (data: string): string => {
  // return Buffer.from(data).toString("base64"); // 에러 날 경우 아래코드로 이용
  if (typeof window !== "undefined") {
    // 브라우저 환경
    return btoa(data);
  } else {
    return Buffer.from(data).toString("base64");
  }
};

export const getClientCredentialToken = async (): Promise<ClientCredentialTokenResponse> => {
  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
    });
    const response = await axios.post("https://accounts.spotify.com/api/token", body, {
      headers: {
        Authorization: `Basic ${encodedBase64(CLIENT_ID + ":" + CLIENT_SECRET)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch client credential token");
  }
};

export const exchangeToken = async (code: string, codeVerifier: string): Promise<ExchangeTokenResponse> => {
  try {
    const url = "https://accounts.spotify.com/api/token";
    // CLIENT_ID , REDIRECT_URI = null일 경우 처리
    if (!CLIENT_ID || !REDIRECT_URI) {
      throw new Error("missing required parameters");
    }
    console.log("!!!", REDIRECT_URI);

    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch token");
  }
};
