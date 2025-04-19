import axios from "axios"
export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("http://localhost:5000/api/v1/user/login", { email, password });
    if (res.status !== 200) {
        throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
};

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
};
export default loginUser;

export const sendChatRequest = async (message: string) => {
    const res = await axios.post("http://localhost:5000/api/v1/chat/new", { message }, { withCredentials: true });
    if (res.status !== 200) throw new Error("Unable to send chat");
    return res.data;
  };
  



