import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: [],
      currentUser: null,
      accessToken: null,
      setUser: (user) => set({ user }),

      // create user account
      createUser: async (newUser) => {
        const API_URL = import.meta.env.VITE_API_URL;
        const {accessToken} = useUserStore.getState();
        if (!newUser.name || !newUser.email || !newUser.password)
          return {
            success: false,
            message: "Please provide all required fileds",
          };
        else if (newUser.password.length < 6)
          return {
            success: false,
            message: "Password must be at least 6 characters long",
          };
        else if (newUser.name.length < 3)
          return {
            success: false,
            message: "Name must be at least 3 characters long",
          };
        else if (!/^[\w.-]+@gmail\.com$/.test(newUser.email))
          return {
            success: false,
            message: "Please provide a valid email address",
          };

        const res = await fetch(`${API_URL}/api/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
        const data = await res.json();
        set((state) => ({ user: [...state.user, data.data] }));
        return { success: true, message: "Account created successfully" };
      },

      // update user account
      updateUser: async (userid, updatedUser) => {
        const API_URL = import.meta.env.VITE_API_URL;
        const {accessToken} = useUserStore.getState();
        const res = await fetch(`${API_URL}/api/users/${userid}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`, },
          body: JSON.stringify(updatedUser),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
          user: state.user.map((u) => (u._id === userid ? data.data : u)),
          currentUser:
            state.currentUser?._id === userid ? data.data : state.currentUser,
        }));
        return { success: true, message: data.message };
      },

      // delete user account
      deleteUser: async (userid) => {
        const API_URL = import.meta.env.VITE_API_URL;
        const { accessToken } = useUserStore.getState();
        const res = await fetch(`${API_URL}/api/users/${userid}`,{
        method: "DELETE",
        headers: {Authorization: `Bearer ${accessToken}`,}, 
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ user: state.user.filter((u) => u._id !== userid) }));
        return { success: true, message: data.message };
      },

      //fetch users
      fetchUsers: async () => {
        const API_URL = import.meta.env.VITE_API_URL;
        const { accessToken } = useUserStore.getState();
        const res = await fetch(`${API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        if (data.success) set({ user: data.data });
      },

      // sign in to account
      signInUser: async ({ email, password }) => {
        const API_URL = import.meta.env.VITE_API_URL;
        const { accessToken } = useUserStore.getState();
        const res = await fetch(`${API_URL}/api/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.success) {
          set({
            currentUser: data.user,
            accessToken: data.accessToken,
          });
          return { success: true, user: data.user };
        }
        return { success: false, message: data.message };
      },

      // sign out from account
      signOutUser: () => {
        set({ currentUser: null });
        return { success: true, message: "Logout successfully" };
      },
    }),
    { name: "user-storage" },
  ),
);
