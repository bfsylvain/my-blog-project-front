import axios from "axios";

const fetchTokenData = async (BASE_URL: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/jwtid`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    return null
  }
};

export default fetchTokenData;
