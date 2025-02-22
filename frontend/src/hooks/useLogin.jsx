import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const login = async ({username, password}) => {
        if (!handleInputErrors(username, password)) return;

        setLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, { username, password });

            if (data._id && data.username) {
                const user = {
                    _id: data._id,
                    role: data.role || "",
                    username: data.username,
                };

                localStorage.setItem("current-user", JSON.stringify(user));
                setAuthUser(user);
                navigate("/faculty");
                toast.success("Login successful!");
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || error.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}
