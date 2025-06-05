import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth, provider } from "../firebase/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";

const useAuthStore = create(
  persist(
    (set) => {
      onAuthStateChanged(auth, (user) => {
        set({ user, isAuthenticated: !!user, loading: false });
      });

      return {
        user: null,
        loading: true,
        isAuthenticated: false,

        loginWithGoogle: async () => {
          try {
            await signInWithPopup(auth, provider);
          } catch (err) {
            console.error("Login failed", err);
            toast.error("Google login failed.");
          }
        },

        loginWithEmail: async (email, password) => {
          try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in successfully!");
          } catch (err) {
            console.error("Email login failed", err);
            toast.error(err.message || "Login failed.");
          }
        },

        registerWithEmail: async (email, password) => {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success("Account created successfully!");
          } catch (err) {
            console.error("Register failed", err);
            toast.error(err.message || "Failed to create account.");
            throw err;
          }
        },

        logout: async () => {
          try {
            await signOut(auth);
            set({ user: null, isAuthenticated: false });
            toast.success("You have been logged out.");
          } catch (err) {
            console.error("Logout failed", err);
            toast.error("Logout failed.");
          }
        },
      };
    },
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
