import axios from "axios";

const fetchTokenData = async (backendUrl) => {
  try {
    const response = await axios.get(`${backendUrl}/jwtid`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    return null
  }
};

export default fetchTokenData;
