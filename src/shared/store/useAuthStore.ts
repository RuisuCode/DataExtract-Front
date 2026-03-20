import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
    isAuthenticated: boolean;
    isLoginModalOpen: boolean;
    isLoading: boolean;
    user: any | null;

    // Actions
    setAuthenticated: (value: boolean) => void;
    openLoginModal: () => void;
    closeLoginModal: () => void;
    setUserInfo: (user: any) => void;
    checkAuth: () => boolean;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: !!Cookies.get("adonis-session"), // Or whichever cookie name the backend uses
    isLoginModalOpen: false,
    isLoading: false,
    user: null,

    setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
    openLoginModal: () => set({ isLoginModalOpen: true }),
    closeLoginModal: () => set({ isLoginModalOpen: false }),
    setUserInfo: (user: any) => set({ user }),

    checkAuth: () => {
        const hasCookie = !!Cookies.get("adonis-session");
        set({ isAuthenticated: hasCookie });
        return hasCookie;
    },

    logout: () => {
        Cookies.remove("adonis-session");
        set({ isAuthenticated: false, user: null });
    }
}));
