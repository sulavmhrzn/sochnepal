import { customAxios } from "@/lib/customAxios";
import { create } from "zustand";

const LOCALSTORAGE_KEY = "sochNepal";
interface User {
    email: string;
}
interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: ({ email }: { email: string }) => void;
    initializeAuth: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login({ email }) {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ email }));
        set({ user: { email: email }, isAuthenticated: true });
    },
    async initializeAuth() {
        const { status, data } = await customAxios.get("/auth/users/me");
        if (status === 200) this.login({ email: data.email });
    },
    async logout() {
        localStorage.removeItem("sochNepal");
        await customAxios.post("/auth/logout/");
        set({ user: null, isAuthenticated: false });
    },
}));
