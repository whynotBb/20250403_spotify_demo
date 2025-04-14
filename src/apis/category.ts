import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { GetBrowseCategoriesResponse } from "../models/category";

export const getBrowseCategories = async (clientCredentialToken: string): Promise<GetBrowseCategoriesResponse> => {
	try {
		const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
			headers: {
				Authorization: `Bearer ${clientCredentialToken}`,
			},
		});
		return response.data;
	} catch (error) {
		throw new Error("fail to fetch browse categories");
	}
};
