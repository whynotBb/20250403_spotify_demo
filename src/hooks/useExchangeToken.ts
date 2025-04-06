import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { ExchangeTokenResponse } from "../models/auth";

const useExchangeToken = () => {
  const queryClient = useQueryClient();
  //post 를 쓸때는 = useMutation 을 사용하고 return 해줘야함,
  // useMutation 의 경우, 타입은 제네릭으로 해 줘야 함
  // <응답값 타입, 에러타입, 함수 파라미터값>
  return useMutation<ExchangeTokenResponse, Error, { code: string; codeVerifier: string }>({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      //로그인 후에 프로파일 가져오는 함수 호출하기 : query id 의 캐시값을 지워주면 다시 데이터를 가져오게 되어 업데이트 되는 효과
      queryClient.invalidateQueries({
        queryKey: ["current-user-profile"],
      });
    },
  });
};

export default useExchangeToken;
