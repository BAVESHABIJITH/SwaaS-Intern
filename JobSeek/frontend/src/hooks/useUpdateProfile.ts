import { useState } from "react";
import { api } from "../services/api";

interface UpdateProfileData {
name: string;
email: string;
}

export const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);

    const updateProfile = async (data: UpdateProfileData) => {
        try {
            setLoading(true);
            const response = await api.put("/users/updateProfile", data);

            return response.data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
    }
};

    return {
        updateProfile,
        loading,
    };
};
