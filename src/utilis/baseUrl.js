const getBaseUrl = () => {
    return "https://book-review-and-store-backend.vercel.app" || import.meta.env.VITE_BASE_URL;
}
export default getBaseUrl;
