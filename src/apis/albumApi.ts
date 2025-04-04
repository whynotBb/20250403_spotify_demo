import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { getNewReleasesResponse } from "../models/album";

export const getNewRelease = async (clientCredentialToken: string): Promise<getNewReleasesResponse> => {
	try {
		const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`, {
			headers: {
				Authorization: `Bearer ${clientCredentialToken}`,
			},
		});
		return response.data;
	} catch (error) {
		throw new Error("fail to fetch new releases");
	}
};
