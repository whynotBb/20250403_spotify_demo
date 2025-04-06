import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApi";
import { User } from "../models/user";

//user profile 은 로그인 했을때만 실행해야 하므로, 조건문 추가해줘야 함
// enabled: !!accessToken, > accessToken 있을때만 함수 실행 한다는 옵션
const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
  const accessToken = localStorage.getItem("access_token");
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
    enabled: !!accessToken,
  });
};

export default useGetCurrentUserProfile;
