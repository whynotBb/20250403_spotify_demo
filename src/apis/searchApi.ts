import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { searchRequestParams, searchResponse } from "../models/search";

export const searchItemsByKeyword = async (token: string, params: searchRequestParams): Promise<searchResponse> => {
	try {
		// 호출할때 붙여줄 search params 만들기
		const searchParams = new URLSearchParams();
		searchParams.append("q", params.q);
		searchParams.append("type", params.type.join(",")); // sting 으로 바꿔주기

		if (params.market) searchParams.append("market", params.market);
		if (params.limit) searchParams.append("limit", params.limit.toString());
		if (params.offset) searchParams.append("offset", params.offset.toString());
		if (params.include_external) searchParams.append("offset", params.include_external);

		// search 는 로그인 없이도 작동 해야 하므로 api. 대신 axios로 바로 호출한다
		const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${searchParams.toString()}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		throw new Error("fail to search keyword");
	}
};
