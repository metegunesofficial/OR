import { create } from "zustand";

export interface User {
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
  selectedUser: User | null;
  addUser: (user: Omit<User, "id" | "status" | "lastActive">) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  setSelectedUser: (user: User | null) => void;
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@hospital.com",
    role: "admin",
    status: "active",
    lastActive: new Date().toISOString(),
    avatarUrl: "https://dummyimage.com/40/4f46e5/ffffff&text=AU",
  },
];

export const useUserStore = create<UserState>((set) => ({
  users: initialUsers,
  selectedUser: null,

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

  setSelectedUser: (user) => set({ selectedUser: user }),
}));
