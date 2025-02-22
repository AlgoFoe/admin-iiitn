import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const signup = async ({ role, username, password }) => {
        if (!handleInputErrors({ role, username, password })) return;

        setLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, {
                role,
                username,
                password,
            });

            if (data.error) {
                throw new Error(data.error);
            }

            if (data._id && data.username) {
                const user = {
                    _id: data._id,
                    role: data.role || "",
                    username: data.username,
                };

                localStorage.setItem("current-user", JSON.stringify(user));
                setAuthUser(user);
                navigate("/faculty");
                toast.success("Signup successful!");
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || error.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ role, username, password }) {
    if (!role || !username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}
