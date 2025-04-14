import { ApiResponse } from "./apiResponse";

export interface GetBrowseCategoriesResponse {
	categories: ApiResponse<Category>;
}
export interface Category {
	url: string;
	icons: {
		url: string;
		height: number;
		width: number;
	}[];
	id: string;
	name: string;
}
