import fetchTokenData from "../utils/FetchTokenData.tsx";
const userLoader = async () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  try {
    const user = await fetchTokenData(backendUrl);
    return user;
  } catch(err) {
    console.error("failed to fetch user data");
    return {id: "", pseudo:""};
  }
}

export default userLoader;