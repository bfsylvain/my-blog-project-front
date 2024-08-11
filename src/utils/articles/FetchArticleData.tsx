import axios from "axios";

const fetchArticleData = async ({params}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/articles/${params.id}`)
        if(response) {
            return response.data;
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null
    }
}

export default fetchArticleData;