// const HOST_URL = "http://localhost:3000";
const HOST_URL = process.env.REACT_APP_API_ENDPOINT;

const APIs = {
    LOGIN: `${HOST_URL}/login`,
    SIGNUP: `${HOST_URL}/signup`,
};

export default APIs;
export { HOST_URL };