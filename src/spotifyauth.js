import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "90a359cce6d24eee9a0aa17ea7524509";
const redirectURL = "http://localhost:3000/";
const scopes = [
	"user-library-read",
	"playlist-read-private",
	"user-read-private",
	"user-top-read",
	"user-follow-read",
];

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scopes.join(
	"%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
	baseURL: "https://api.spotify.com/v1",
}); // This is the base url for all the requests

// This function is used to set the token in the header of the request
export const setClientToken = (token) => {
	apiClient.interceptors.request.use(async function (config) {
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});
};

export default apiClient;
