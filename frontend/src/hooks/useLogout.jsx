import { useState } from "react";
import axios from "axios";
import useAuthContext from "./useAuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/logout`);

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("current-user");
            setAuthUser(null);
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error(error.response?.data?.error || error.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;
