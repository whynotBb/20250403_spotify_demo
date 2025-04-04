import { useQuery } from "@tanstack/react-query";
import { getNewRelease } from "../apis/albumApi";
import useClientCredentialToken from "./useClientcredentialToken";

const useGetNewReleases = () => {
	//토큰 가져오기
	const clientCredentialToken = useClientCredentialToken();
	return useQuery({
		queryKey: ["new-releases"], //id 값, 유니크해야함
		queryFn: () => {
			if (!clientCredentialToken) {
				throw new Error("No token available");
			}
			return getNewRelease(clientCredentialToken);
		},
	});
};

export default useGetNewReleases;
