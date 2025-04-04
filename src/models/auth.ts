//auth 관련 type

export interface ClientCredentialTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number; //int = number
}
