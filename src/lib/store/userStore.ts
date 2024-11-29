import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastActive: string;
  avatarUrl?: string;
}

interface UserState {
  users: User[];
  addUser: (user: Omit<User, "id" | "status" | "lastActive">) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [
    {
      id: "1",
      name: "John Doe",
      email: "john@hospital.com",
      role: "Admin",
      status: "active",
      lastActive: new Date().toISOString(),
      avatarUrl: "https://dummyimage.com/40/4f46e5/ffffff&text=JD",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@hospital.com",
      role: "Surgeon",
      status: "active",
      lastActive: new Date().toISOString(),
      avatarUrl: "https://dummyimage.com/40/4f46e5/ffffff&text=JS",
    },
  ],
  addUser: (newUser) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          ...newUser,
          id: Math.random().toString(36).substr(2, 9),
          status: "active",
          lastActive: new Date().toISOString(),
        },
      ],
    })),
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user,
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));
