import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientcredentialToken";
import { getBrowseCategories } from "../apis/category";

const useGetBrowseCategories = () => {
	const clientCredentialToken = useClientCredentialToken();
	return useQuery({
		queryKey: ["browse-categories"],
		queryFn: () => {
			if (!clientCredentialToken) {
				throw new Error("No token available");
			}
			return getBrowseCategories(clientCredentialToken);
		},
	});
};
export default useGetBrowseCategories;
