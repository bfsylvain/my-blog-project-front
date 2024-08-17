import fetchTokenData from "../utils/FetchTokenData.tsx";
const userLoader = async () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  try {
    const user = await fetchTokenData(BASE_URL);
    return user;
  } catch(err) {
    console.error("failed to fetch user data");
    return {id: "", pseudo:""};
  }
}

export default userLoader;