import { customAxios } from "@/lib/customAxios";
import { create } from "zustand";

const LOCALSTORAGE_KEY = "sochNepal";
interface User {
    email: string;
    firstName: string;
    lastName: string;
}
interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: ({
        email,
        firstName,
        lastName,
    }: {
        email: string;
        firstName: string;
        lastName: string;
    }) => void;
    initializeAuth: () => void;
    logout: () => void;
    updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login({ email, firstName, lastName }) {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ email }));
        set({ user: { email, firstName, lastName }, isAuthenticated: true });
    },
    async initializeAuth() {
        try {
            const { status, data } = await customAxios.get("/auth/users/me");
            if (status === 200)
                this.login({
                    email: data.email,
                    firstName: data.first_name,
                    lastName: data.last_name,
                });
        } catch (error) {
            console.log(error);
        }
    },
    async logout() {
        localStorage.removeItem("sochNepal");
        await customAxios.post("/auth/logout/");
        set({ user: null, isAuthenticated: false });
    },
    updateUser(user: User) {
        set({ user: user });
    },
}));
