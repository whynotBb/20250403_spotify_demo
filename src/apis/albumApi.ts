import axios from "axios";

export const getNewRelease = async () => {
	try {
		const reponse = await axios.get("https://api.spotify.com/v1/browse/new-releases");
	} catch (error) {}
};
