import axios from "axios";
import { clientId, clientSecret } from "../configs/authConfig";
import { ClientCredentialTokenResponse } from "../models/auth";

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
				Authorization: `Basic ${encodedBase64(clientId + ":" + clientSecret)}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		return response.data;
	} catch (error) {
		throw new Error("fail to fetch client credential token");
	}
};
