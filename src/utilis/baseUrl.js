const getBaseUrl = () => {
    return "http://localhost:5000" || import.meta.env.VITE_BASE_URL;
}
export default getBaseUrl;