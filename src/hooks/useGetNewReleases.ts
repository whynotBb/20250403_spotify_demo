import { useQuery } from "@tanstack/react-query";
import { getNewRelease } from "../apis/albumApi";

const useGetNewReleases = () => {
	return useQuery({
		queryKey: ["new-releases"], //id 값, 유니크해야함
		queryFn: () => {
			return getNewRelease();
		},
	});
};
