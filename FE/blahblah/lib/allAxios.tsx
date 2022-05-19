import Axios from "axios";

const SERVER_API_URL = "https://blahblah.community:8443/api";

const allAxios = Axios.create({
  baseURL: `${SERVER_API_URL}`,
});

export default allAxios;
